import { Component, inject, Inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { FormsModule } from "@angular/forms";
import { OrderService } from "../../services/order.service";
import { QuantityInputComponent } from "../../components/inputs/quantity/quantity-input.component";
import { Order, OrderItem } from "../../shared/models/order.model";
import { Router } from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatIconModule,
        MatListModule,
        QuantityInputComponent
    ],
})
export class CartComponent implements OnInit {
    public ordersService = inject(OrderService);
    public router = inject(Router);
    clientId = localStorage.getItem('clientId') || '';
    pendingOrderId = '';
    total: number = 0;

    cartItems: OrderItem[] = []

    ngOnInit(): void {
        console.log('Carrinho carregado');
        this.loadCart();
    }

    loadCart() {
        if (!this.clientId) return;

        this.ordersService.getPendingOrder(this.clientId).subscribe({
            next: (order: Order) => {
                if (order) {
                    this.cartItems = order.items;
                    this.pendingOrderId = order._id;
                    this.updateTotal();
                }
            },
            error: (err: unknown) => console.log('Erro ao carregar carrinho', err)
        })
    }

    updateTotal() {
        this.total = this.cartItems.reduce((sum, item) => {
            return sum + item.product.value * item.quantity;
        }, 0);
    }

    // remove(item: OrderItem) {
    //     // Remover item do carrinho - lógica para remover e atualizar o pedido
    //     this.ordersService.removeItemFromCart(this.pendingOrderId, item._id).subscribe({
    //         next: () => {
    //             console.log('Item removido');
    //             this.loadCart(); // Recarrega o carrinho após remover o item
    //         },
    //         error: (err: unknown) => console.error('Erro ao remover item', err),
    //     });
    // }

    checkout() {
        // Lógica de checkout
        console.log('Finalizando pedido...');
    }
}