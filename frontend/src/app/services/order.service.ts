import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateOrder, Order } from '../shared/models/order.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl = 'http://localhost:3000/orders'

    constructor(private http: HttpClient) { }

    createOrder(order: CreateOrder): Observable<CreateOrder>{
        return this.http.post<CreateOrder>(this.apiUrl, order)
    }

    addToCart(clientId: string, data: {productId: string, quantity: number}): Observable<Order>{
        return this.http.post<Order>(`${this.apiUrl}/cart/${clientId}`, data)
    }

    getOrders(): Observable<Order[]>{
        return this.http.get<Order[]>(this.apiUrl)
    }

    getOrderById(id: string): Observable<Order>{
        return this.http.get<Order>(`${this.apiUrl}/${id}`)
    }

    updateOrder(id: string, order: Order): Observable<Order>{
        return this.http.put<Order>(`${this.apiUrl}/${id}`, order)
    }

    deleteOrder(id: string): Observable<Order>{
        return this.http.delete<Order>(`${this.apiUrl}/${id}`)
    }
}
