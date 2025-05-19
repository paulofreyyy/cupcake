import { Component, inject, OnInit } from "@angular/core";
import { Product } from "../../shared/models/product.model";
import { ProductService } from "../../services/product.service";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { OrderService } from "../../services/order.service";
import { QuantityInputComponent } from "../../components/inputs/quantity/quantity-input.component";
import { NotificationHelper } from "../../shared/helpers/notification-helpers";
import { CartService } from "../../services/cart.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatIconModule,
    ],
})
export class HomeComponent implements OnInit {
    products: Product[] = [];
    loading = false;
    quantities: { [productId: string]: number } = {}

    private productService = inject(ProductService);
    private orderService = inject(OrderService);
    private cartService = inject(CartService);
    private notificationHelper = inject(NotificationHelper);
    public router = inject(Router);

    constructor() { }

    ngOnInit(): void {
        this.getProducts()
    }

    getProducts(): void {
        this.loading = true;
        this.productService.getProducts().subscribe({
            next: (data) => {
                this.products = data
                this.loading = false;
            },
            error: (err) => {
                this.notificationHelper.showError(err.error.message);
                this.loading = false;
            },
        });
    }

    addToCart(product: Product) {
        const clientId = localStorage.getItem('clientId')
        if (!clientId) {
            this.notificationHelper.showError('Cliente não encontrado. Por favor, faça o login.');
            this.router.navigate(['/login'])
            return
        }

        const data = {
            productId: product._id,
            quantity: 1
        }
        this.orderService.addToCart(clientId, data)
            .subscribe({
                next: () => {
                    this.notificationHelper.showSuccess('Item adicionado ao carrinho!');
                    this.cartService.refresh()
                },
                error: (err) => {
                    this.notificationHelper.showError(err.error.message);
                }
            })
    }
}