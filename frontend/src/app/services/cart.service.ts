import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderService } from './order.service'; // Ajuste o caminho
import { AuthService } from './auth.service'; // Para pegar o clientId autenticado (se tiver)

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private itemsCountSubject = new BehaviorSubject<number>(0);
    itemsCount$ = this.itemsCountSubject.asObservable();

    constructor(private orderService: OrderService, private authService: AuthService) {
        this.loadCart();
    }

    private loadCart() {
        const clientId = localStorage.getItem('clientId'); // método que retorna o id do usuário logado
        if (!clientId) {
            this.itemsCountSubject.next(0);
            return;
        }

        this.orderService.getPendingOrder(clientId).subscribe({
            next: order => {
                // supondo que order.items é array de OrderItem que tem quantity
                const count = order?.items?.length?? 0;
                this.itemsCountSubject.next(count);
            },
            error: () => this.itemsCountSubject.next(0)
        });
    }

    // Caso queira atualizar a contagem após adicionar/remover algo no carrinho
    refresh() {
        this.loadCart();
    }

    updateCount(count: number) {
        this.itemsCountSubject.next(count);
    }
}
