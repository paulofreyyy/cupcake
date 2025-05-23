import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {

    constructor(private readonly productsService: ProductService) { }

    @Post()
    create(@Body() dto: CreateProductDto) {
        return this.productsService.create(dto)
    }

    @Get()
    findAll() {
        return this.productsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(id)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
        return this.productsService.update(id, dto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productsService.remove(id)
    }
}
