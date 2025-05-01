import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Orders, OrdersSchema } from './schemas/order.schema';
import { ProductModule } from 'src/product/product.module';
import { Products, ProductSchema } from 'src/product/schemas/product.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Orders.name, schema: OrdersSchema },
            { name: Products.name, schema: ProductSchema }
        ]),
        ProductModule
    ],
    providers: [OrdersService],
    controllers: [OrdersController]
})
export class OrdersModule { }
