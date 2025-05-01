import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductSchema } from './schemas/product.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Products.name, schema: ProductSchema }])],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule { }
