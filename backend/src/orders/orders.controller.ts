import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    create(@Body() dto: CreateOrderDto) {
        return this.ordersService.create(dto);
    }

    @Get()
    findAll() {
        return this.ordersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
        return this.ordersService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ordersService.remove(id);
    }

    @Get("cart/:clientId")
    findPendingCart(@Param('clientId') clientId: string){
        return this.ordersService.findPendingCartByClient(clientId)
    }

    @Post("cart/:clientId")
    addToCart(@Param('clientId') clientId: string, @Body() body: { productId: string, quantity?: number }) {
        return this.ordersService.addToCart(clientId, body.productId, body.quantity || 1)
    }

    @Delete('cart/:orderId/item/:product:id')
    removeItemFromCart(@Param('orderId') orderId: string, @Param('productId') productId: string){
        return this.removeItemFromCart(orderId, productId)
    }

}
