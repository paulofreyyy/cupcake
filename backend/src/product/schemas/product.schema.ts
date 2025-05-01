import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Products extends Document{
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