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
    status: 'pending' | 'paid' | 'checkout' | 'cancelled';

    @Prop({ type: Object })
    address: {
        street: string;
        number: string;
        district: string;
        city: string;
        state: string;
        zip: string;
    };

    @Prop({ type: Object })
    payment: {
        paymentMethod: string;
        total: number;
        shippingFee: number;
    };
}

export const OrdersSchema = SchemaFactory.createForClass(Orders);
