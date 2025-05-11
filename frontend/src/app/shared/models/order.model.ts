import { Product } from "./product.model";

export interface OrderItem {
    product: Product;
    quantity: number;
    _id: string;
    image: string;
}

export interface Order {
    _id: string;
    clientId: string;
    items: OrderItem[];
    total: number;
    status: 'pending' | 'paid' | 'shipped' | 'cancelled';
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export interface CreateOrder {
    clientId: string;
    items: { product: string; quantity: number }[];
}

export interface UpdateOrderItem {
    product: string;
    quantity: number;
};