import { Product } from "./product.model";

export interface Address {
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    zip: string;
}

export interface Payment {
    paymentMethod: string;
    total: number;
    shippingFee: number;
}

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
    orderTotal: number;
    status: 'pending' | 'paid' | 'checkout' | 'cancelled';
    address: string;
    payment: Payment;
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