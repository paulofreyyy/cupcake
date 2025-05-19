
import { Component, inject, OnInit } from "@angular/core";
import { Product } from "../../shared/models/product.model";
import { ProductService } from "../../services/product.service";
import { CommonModule, Location } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { OrderService } from "../../services/order.service";
import { NotificationHelper } from "../../shared/helpers/notification-helpers";
import { CartService } from "../../services/cart.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css'],
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
export class ProductDetailComponent implements OnInit {
    product: Product | null = null;
    quantities: { [productId: string]: number } = {}
    
    private route = inject(ActivatedRoute);
    private productService = inject(ProductService);
    private orderService = inject(OrderService);
    private cartService = inject(CartService);
    private notificationHelper = inject(NotificationHelper);
    public router = inject(Router);
    public location = inject(Location);

    productId = this.route.snapshot.paramMap.get('productId')!
    
    ngOnInit(): void {
         this.productService.getProductById(this.productId).subscribe({
            next: (data: Product) => {
                this.product = data
            },
            error: (err) => {
                this.notificationHelper.showError(err);
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
                    this.notificationHelper.showError('Erro ao adicionar item ao carrinho!');
                }
            })
    }
}