import { Product } from "./product.model";

export interface OrderItem {
    product: Product;  // Produto agora é um objeto completo
    quantity: number;
    _id: string;
}

export interface Order {
    _id: string;
    clientId: string;
    items: OrderItem[];  // Array de OrderItem, com produtos completos
    total: number;
    status: 'pending' | 'paid' | 'shipped' | 'cancelled';
    createdAt: string;
    updatedAt: string;
    __v: number;  // Versão, conforme sua estrutura da API
}


export interface CreateOrder {
    clientId: string;
    items: { product: string; quantity: number }[];
}