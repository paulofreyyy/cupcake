import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Orders } from './schemas/order.schema';
import { Products } from 'src/product/schemas/product.schema';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Orders.name) private orderModel: Model<Orders>,
        @InjectModel(Products.name) private productModel: Model<Products>
    ) { }

    async create(dto: CreateOrderDto) {
        let orderTotal = 0;

        for (const item of dto.items) {
            const product = await this.productModel.findById(item.product).exec();
            if (!product) throw new NotFoundException(`Produto com id ${item.product} não encontrado!`);

            orderTotal += product.value * item.quantity
        }

        const created = new this.orderModel({ ...dto, orderTotal });
        return created.save();
    }

    async findAll() {
        return this.orderModel.find().populate('items.product').populate('clientId');
    }

    async findOne(id: string) {
        const order = await this.orderModel.findById(id).populate('items.product').populate('clientId');
        if (!order) throw new NotFoundException('Order not found');
        return order;
    }

    async findOrdersByStatus(clientId: string, status: string) {
        const order = await this.orderModel.find({ clientId, status }).populate('items.product').populate('clientId');
        if (!order) throw new NotFoundException('Order not found');
        return order;
    }
    async findUserOrderHistory(clientId: string) {
        const orders = await this.orderModel.find({ clientId }).populate('items.product').populate('clientId');
        if (!orders) throw new NotFoundException('Order not found');
        return orders;
    }

    async update(id: string, dto: UpdateOrderDto) {
        return this.orderModel.findByIdAndUpdate(id, dto, { new: true });
    }

    async remove(id: string) {
        return this.orderModel.findByIdAndDelete(id);
    }

    async findPendingCartByClient(clientId: string) {
        return await this.orderModel.findOne({ clientId, status: 'pending' }).populate('items.product')
    }

    async findCheckoutOrder(clientId: string) {
        return await this.orderModel.findOne({ clientId, status: 'checkout' }).populate('items.product')
    }

    async addToCart(clientId: string, productId: string, quantity: number) {
        const product = await this.productModel.findById(productId).exec();
        if (!product) throw new NotFoundException(`Produto com id ${productId} não encotnrado!`);

        let order = await this.orderModel.findOne({ clientId, status: 'pending' });

        if (order) {
            const itemIndex = order.items.findIndex(item => item.product.toString() === productId);

            if (itemIndex >= 0) {
                order.items[itemIndex].quantity += quantity;
            } else {
                order.items.push({ product: product._id as Types.ObjectId, quantity })
            }

            order.orderTotal = (order.orderTotal || 0) + product.value * quantity;

            return order.save();
        }

        const orderTotal = product.value * quantity
        const newOrder = new this.orderModel({
            clientId,
            status: 'pending',
            orderTotal,
            items: [
                { product: product._id, quantity }
            ]
        })

        return newOrder.save()
    }

    async removeItemFromCart(orderId: string, productId: string) {
        const order = await this.orderModel.findById(orderId).exec();
        if (!order) throw new NotFoundException("Pedido não encontrado!");

        order.items = order.items.filter(item => item.product.toString() !== productId);

        if (order.items.length === 0) {
            await this.orderModel.findByIdAndDelete(orderId);
            return { message: 'Item removido e pedido deletado por falta de itens.' }
        }

        // Busca os produtos atualizados no banco
        const productIds = order.items.map(item => item.product);
        const products = await this.productModel.find({ _id: { $in: productIds } }).exec();

        // Recalcula o total com base nos produtos encontrados
        let orderTotal = 0;
        for (const item of order.items) {
            const product = products.find(p => p._id.toString() === item.product.toString());
            if (product) {
                orderTotal += product.value * item.quantity;
            }
        }

        order.orderTotal = orderTotal;

        order.markModified('items');
        order.markModified('orderTotal');
        await order.save();
        await order.save();
        return { message: 'Item removido com sucesso!' }
    }

    async checkoutOrder(orderId: string, updatedItens: { product: string, quantity: number }[]) {
        const order = await this.orderModel.findById(orderId).exec();
        if (!order) throw new NotFoundException("Pedido não encontrado!");

        if (order.status !== 'pending') {
            throw new Error('Não é possível atualizar um pedido que não está pendente.');
        }

        // Verifica se já existe uma outra order com status 'checkout' para o mesmo usuário
        const existingCheckout = await this.orderModel.findOne({
            clientId: order.clientId,
            status: 'checkout',
            _id: { $ne: order._id }, // garante que não está verificando a própria order
        }).exec();

        if (existingCheckout) {
            throw new ConflictException('Já existe um pedido em checkout, finalize antes de realizar um novo pedido.');
        }

        let orderTotal = 0;
        const newItems = [];

        for (const item of updatedItens) {
            const product = await this.productModel.findById(item.product).exec();
            if (!product) throw new NotFoundException(`Produto com id ${item.product} não encontrado!`);

            if (typeof product.value !== 'number' || isNaN(product.value)) {
                throw new Error(`Produto com id ${item.product} possui um valor inválido.`);
            }

            orderTotal += product.value * item.quantity;
            newItems.push({
                product: product._id,
                quantity: item.quantity
            });
        }

        order.items = newItems;
        order.orderTotal = orderTotal;
        order.status = 'checkout'
        order.markModified('items');
        order.markModified('status');

        return order.save();
    }

    async orderPayment(
        orderId: string,
        status: 'paid' | 'cancelled',
        address: { street: string, number: string, district: string, city: string, state: string, zip: string },
        payment: { total: number, shippingFee: number, paymentMethod: string }
    ) {
        const order = await this.orderModel.findById(orderId).exec();
        if (!order) throw new NotFoundException('Pedido não encontrado');

        order.status = status;
        order.address = address;
        order.payment = payment;
        order.orderTotal = payment.total + payment.shippingFee;

        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 3);
        order.deliveryDate = deliveryDate;

        // Marca os campos como modificados, se necessário
        order.markModified('status');
        order.markModified('address');
        order.markModified('payment');
        order.markModified('orderTotal');
        order.markModified('deliveryDate');

        return order.save();
    }
}
