import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateOrderItemsDto } from './dto/update-order-itens.dto';

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
    findPendingCart(@Param('clientId') clientId: string) {
        return this.ordersService.findPendingCartByClient(clientId)
    }
    @Get("cart/checkout/:clientId")
    findCheckoutOrder(@Param('clientId') clientId: string) {
        return this.ordersService.findCheckoutOrder(clientId)
    }

    @Post("cart/:clientId")
    addToCart(@Param('clientId') clientId: string, @Body() body: { productId: string, quantity?: number }) {
        return this.ordersService.addToCart(clientId, body.productId, body.quantity || 1)
    }

    @Delete('cart/:orderId/item/:productId')
    removeItemFromCart(@Param('orderId') orderId: string, @Param('productId') productId: string) {
        return this.ordersService.removeItemFromCart(orderId, productId)
    }

    @Patch(':orderId/itens')
    async checkoutOrder(@Param('orderId') orderId: string, @Body() updatedItems: UpdateOrderItemsDto[],) {
        return this.ordersService.checkoutOrder(orderId, updatedItems);
    }

    @Patch(':orderId/payment')
    async orderPayment(
        @Param('orderId') orderId: string,
        @Body() dto: UpdateOrderDto,
    ) {
        const { status, address, payment } = dto;

        return this.ordersService.orderPayment(orderId, status, address, payment);
    }
}
