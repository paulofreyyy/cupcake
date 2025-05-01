import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Products } from "src/product/schemas/product.schema";

@Schema({ timestamps: true })
export class Orders extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    clientId: Types.ObjectId;

    @Prop({ type: [{ product: { type: Types.ObjectId, ref: 'Products' }, quantity: Number }] })
    items: { product: Products | Types.ObjectId; quantity: number }[];

    @Prop()
    total: number;

    @Prop({ default: 'pending' })
    status: 'pending' | 'paid' | 'shipped' | 'cancelled';
}

export const OrdersSchema = SchemaFactory.createForClass(Orders)