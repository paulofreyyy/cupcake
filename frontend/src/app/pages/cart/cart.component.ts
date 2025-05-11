import { Component, inject, Inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { FormsModule } from "@angular/forms";
import { OrderService } from "../../services/order.service";
import { QuantityInputComponent } from "../../components/inputs/quantity/quantity-input.component";
import { Order, OrderItem } from "../../shared/models/order.model";
import { NotificationHelper } from "../../shared/helpers/notification-helpers";

@Component({
    selector: 'app-home',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatIconModule,
        MatListModule,
        QuantityInputComponent,
        // MatSnackBarModule,
    ],
})
export class CartComponent implements OnInit {
    private ordersService = inject(OrderService);
    private notificationHelper = inject(NotificationHelper);
    clientId = localStorage.getItem('clientId') || '';
    pendingOrderId = '';
    total: number = 0;

    cartItems: OrderItem[] = []

    ngOnInit(): void {
        this.loadCart();
    }

    loadCart() {
        if (!this.clientId) return;

        this.ordersService.getPendingOrder(this.clientId).subscribe({
            next: (order: Order) => {
                if (order) {
                    this.cartItems = order.items;
                    this.pendingOrderId = order._id;
                    this.total = order.total
                } else {
                    this.cartItems = [];
                    this.pendingOrderId = '';
                    this.total = 0;
                }
            },
            error: (err: unknown) => console.log('Erro ao carregar carrinho', err)
        })
    }

    removeItem(productId: string) {
        if (!this.clientId) return;

        this.ordersService.removeItemFromCart(this.pendingOrderId, productId).subscribe({
            next: () => {
                this.notificationHelper.showSuccess('Item removido com sucesso!')
                this.loadCart()
            },
            error: (err)  => {
                this.notificationHelper.showError('Erro ao remover item!')
            },
        })
    }
}