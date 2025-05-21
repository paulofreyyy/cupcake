import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateOrder, Order, UpdateOrderItem } from '../shared/models/order.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl = environment.apiUrl

    constructor(private http: HttpClient) { }

    createOrder(order: CreateOrder): Observable<CreateOrder> {
        return this.http.post<CreateOrder>(this.apiUrl, order)
    }

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiUrl)
    }
    findOrdersByStatus(clientId: string, status: string): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.apiUrl}/orders/${clientId}/status/${status}`)
    }
    findUserOrderHistory(clientId: string): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.apiUrl}/orders/${clientId}/orderHistory`)
    }

    getOrderById(id: string): Observable<Order> {
        return this.http.get<Order>(`${this.apiUrl}/orders/${id}`)
    }

    updateOrder(id: string, order: Order): Observable<Order> {
        return this.http.put<Order>(`${this.apiUrl}/orders/${id}`, order)
    }

    deleteOrder(id: string): Observable<Order> {
        return this.http.delete<Order>(`${this.apiUrl}/orders/${id}`)
    }

    getPendingOrder(clientId: string): Observable<Order> {
        return this.http.get<Order>(`${this.apiUrl}/orders/cart/${clientId}`)
    }
    getCheckoutOrder(clientId: string): Observable<Order> {
        return this.http.get<Order>(`${this.apiUrl}/orders/cart/checkout/${clientId}`)
    }

    addToCart(clientId: string, data: { productId: string, quantity: number }): Observable<Order> {
        return this.http.post<Order>(`${this.apiUrl}/orders/cart/${clientId}`, data)
    }
    removeItemFromCart(orderId: string, productId: string): Observable<Order> {
        return this.http.delete<Order>(`${this.apiUrl}/orders/cart/${orderId}/item/${productId}`)
    }
    checkoutOrder(orderId: string, itens: UpdateOrderItem[]): Observable<Order> {
        return this.http.patch<Order>(`${this.apiUrl}/orders/${orderId}/itens`, itens)
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
        return this.http.patch<Order>(`${this.apiUrl}/orders/${orderId}/payment`, data)
    }

    cancelOrder(orderId: string): Observable<Order>{
        return this.http.post<Order>(`${this.apiUrl}/orders/cancel-order`, {orderId})
    }
}
