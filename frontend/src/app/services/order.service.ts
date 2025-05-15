import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateOrder, Order, OrderItem, UpdateOrderItem } from '../shared/models/order.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl = 'http://localhost:3000/orders'

    constructor(private http: HttpClient) { }

    createOrder(order: CreateOrder): Observable<CreateOrder> {
        return this.http.post<CreateOrder>(this.apiUrl, order)
    }

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiUrl)
    }
    findOrdersByStatus(clientId: string, status: string): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.apiUrl}/${clientId}/status/${status}`)
    }
    findUserOrderHistory(clientId: string): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.apiUrl}/${clientId}/orderHistory`)
    }

    getOrderById(id: string): Observable<Order> {
        return this.http.get<Order>(`${this.apiUrl}/${id}`)
    }

    updateOrder(id: string, order: Order): Observable<Order> {
        return this.http.put<Order>(`${this.apiUrl}/${id}`, order)
    }

    deleteOrder(id: string): Observable<Order> {
        return this.http.delete<Order>(`${this.apiUrl}/${id}`)
    }

    getPendingOrder(clientId: string): Observable<Order> {
        return this.http.get<Order>(`${this.apiUrl}/cart/${clientId}`)
    }
    getCheckoutOrder(clientId: string): Observable<Order> {
        return this.http.get<Order>(`${this.apiUrl}/cart/checkout/${clientId}`)
    }

    addToCart(clientId: string, data: { productId: string, quantity: number }): Observable<Order> {
        return this.http.post<Order>(`${this.apiUrl}/cart/${clientId}`, data)
    }
    removeItemFromCart(orderId: string, productId: string): Observable<Order> {
        return this.http.delete<Order>(`${this.apiUrl}/cart/${orderId}/item/${productId}`)
    }
    checkoutOrder(orderId: string, itens: UpdateOrderItem[]): Observable<Order> {
        return this.http.patch<Order>(`${this.apiUrl}/${orderId}/itens`, itens)
    }
    orderPayment(orderId: string, data: {
        address: string;
        status: 'paid' | 'cancelled';
        payment: {
            paymentMethod: string;
            shippingFee: number;
            total: number;
        };
    }): Observable<Order> {
        return this.http.patch<Order>(`${this.apiUrl}/${orderId}/payment`, data)
    }
}
