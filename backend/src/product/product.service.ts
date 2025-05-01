import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument, Products } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Products.name) private productModel: Model<ProductDocument>,
    ) { }

    async create(createProductDto: CreateProductDto): Promise<Products> {
        const createdProduct = new this.productModel(createProductDto)
        return createdProduct.save()
    }

    async findAll(): Promise<Products[]> {
        return this.productModel.find().exec();
    }

    async findOne(id: string): Promise<Products> {
        const product = await this.productModel.findById(id).exec();
        if (!product) throw new NotFoundException("Produto não encontrado!")
        return product
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<Products> {
        const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
        if (!updatedProduct) throw new NotFoundException("Produto não encontrado!");
        return updatedProduct;
    }

    async remove(id: string): Promise<void> {
        const result = await this.productModel.findByIdAndDelete(id).exec();
        if (!result) throw new NotFoundException("Produto não encontrado!")
    }
}
