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

        for(const item of dto.items){
            const product = await this.productModel.findById(item.product).exec();
            if(!product) throw new NotFoundException(`Produto com id ${item.product} não encontrado!`);

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
}
