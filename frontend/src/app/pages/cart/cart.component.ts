import { Component, inject, OnInit } from "@angular/core";
import { CommonModule, Location } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { FormsModule } from "@angular/forms";
import { OrderService } from "../../services/order.service";
import { QuantityInputComponent } from "../../components/inputs/quantity/quantity-input.component";
import { Order, OrderItem, UpdateOrderItem } from "../../shared/models/order.model";
import { NotificationHelper } from "../../shared/helpers/notification-helpers";
import { Router } from "@angular/router";
import { CartService } from "../../services/cart.service";
import { LoadingHelper } from "../../shared/helpers/loading.helper";
import { LoadingComponent } from "../../components/loading/loading.component";



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
        LoadingComponent
    ],
})
export class CartComponent implements OnInit {
    private ordersService = inject(OrderService);
    private cartService = inject(CartService);
    private notificationHelper = inject(NotificationHelper);
    private router = inject(Router);
    public location = inject(Location);
    private loadingHelper = inject(LoadingHelper);
    clientId = localStorage.getItem('clientId') || '';
    pendingOrderId = '';
    total: number = 0;

    cartItems: OrderItem[] = []

    ngOnInit(): void {
        this.loadCart();
    }

    loadCart() {
        this.loadingHelper.show();
        if (!this.clientId) return;

        this.ordersService.getPendingOrder(this.clientId).subscribe({
            next: (order: Order) => {
                if (order) {
                    this.cartItems = order.items;
                    this.pendingOrderId = order._id;
                    this.total = order.orderTotal
                } else {
                    this.cartItems = [];
                    this.pendingOrderId = '';
                    this.total = 0;
                }
            },
            error: (err: unknown) => console.log('Erro ao carregar carrinho', err),
            complete:() =>{
                this.loadingHelper.hide()
            },
        })
    }

    updateTotal() {
        this.total = this.cartItems.reduce((acc, item) => {
            return acc + item.product.value * item.quantity;
        }, 0)
    }

    removeItem(productId: string) {
        if (!this.clientId) return;

        this.ordersService.removeItemFromCart(this.pendingOrderId, productId).subscribe({
            next: () => {
                this.notificationHelper.showSuccess('Item removido com sucesso!')
                this.cartService.refresh()
                this.loadCart()
            },
            error: (err) => {
                this.notificationHelper.showError(err.error.message)
            },
        })
    }

    checkout() {
        if (!this.pendingOrderId) return;
        const itens: UpdateOrderItem[] = this.cartItems.map(item => ({
            product: item.product._id,
            quantity: item.quantity
        }))

        this.ordersService.checkoutOrder(this.pendingOrderId, itens).subscribe({
            next: () => {
                this.cartService.refresh()
                this.router.navigate([`checkout/${this.pendingOrderId}`])
            },
            error: (err) => {
                this.notificationHelper.showError(err.error.message)
            }
        })
    }
}