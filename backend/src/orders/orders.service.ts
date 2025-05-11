import { Injectable, NotFoundException } from '@nestjs/common';
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
        let total = 0;

        for (const item of dto.items) {
            const product = await this.productModel.findById(item.product).exec();
            if (!product) throw new NotFoundException(`Produto com id ${item.product} não encontrado!`);

            total += product.value * item.quantity
        }

        const created = new this.orderModel({ ...dto, total });
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

    async update(id: string, dto: UpdateOrderDto) {
        return this.orderModel.findByIdAndUpdate(id, dto, { new: true });
    }

    async remove(id: string) {
        return this.orderModel.findByIdAndDelete(id);
    }

    async findPendingCartByClient(clientId: string) {
        return await this.orderModel.findOne({ clientId, status: 'pending' }).populate('items.product')
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

            order.total += product.value * quantity

            return order.save();
        }

        const total = product.value * quantity
        const newOrder = new this.orderModel({
            clientId,
            status: 'pending',
            total,
            items: [
                { product: product._id, quantity }
            ]
        })

        return newOrder.save()
    }

    async removeItemFromCart(orderId: string, productId: string){
        const order = await this.orderModel.findById(orderId).exec();
        if(!order) throw new NotFoundException("Pedido não encontrado!");

        order.items = order.items.filter(item => item.product._id !== productId);

        if(order.items.length === 0){
            await this.orderModel.findByIdAndDelete(orderId);
            return {message: 'Item removido e pedido deletado por falta de itens.'}
        }else{
            await order.save();
            return{message: 'Item removido com sucesso!'}
        }
    }
}
