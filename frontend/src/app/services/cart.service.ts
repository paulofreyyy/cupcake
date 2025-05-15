import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderService } from './order.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private itemsCountSubject = new BehaviorSubject<number>(0);
    itemsCount$ = this.itemsCountSubject.asObservable();

    constructor(private orderService: OrderService) {
        this.loadCart();
    }

    private loadCart() {
        const clientId = localStorage.getItem('clientId'); 
        if (!clientId) {
            this.itemsCountSubject.next(0);
            return;
        }

        this.orderService.getPendingOrder(clientId).subscribe({
            next: order => {
                const count = order?.items?.length?? 0;
                this.itemsCountSubject.next(count);
            },
            error: () => this.itemsCountSubject.next(0)
        });
    }

    refresh() {
        this.loadCart();
    }

    updateCount(count: number) {
        this.itemsCountSubject.next(count);
    }
}
