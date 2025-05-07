export interface Order {
    clientId: string;
    items: { product: string; quantity: number }[];
    total: number;
    status: 'pending' | 'paid' | 'shipped' | 'cancelled';
}

export interface CreateOrder{
    clientId: string;
    items: { product: string; quantity: number }[];
}