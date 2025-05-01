import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProductDocument = Products & Document;

@Schema()
export class Products {
    @Prop({ required: true })
    name: string

    @Prop()
    description: string

    @Prop({ required: true })
    value: number

    @Prop()
    image: string
}

export const ProductSchema = SchemaFactory.createForClass(Products)