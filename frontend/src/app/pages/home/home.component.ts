import { Component, OnInit } from "@angular/core";
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
    error: string | null = null;
    quantities: { [productId: string]: number } = {}

    constructor(
        private productService: ProductService,
        private orderService: OrderService,

    ) { }

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
                this.error = 'Erro ao carregar produtos!';
                this.loading = false;
            },
        });
    }

    deleteProduct(id: string): void {
        this.productService.deleteProduct(id).subscribe({
            next: () => {
                this.products = this.products.filter((product) => product._id !== id);
            },
            error: (err) => {
                this.error = 'Erro ao deletar produto';
            }
        });
    }

    addToCart(product: Product) {
        const clientId = localStorage.getItem('clientId')
        if (!clientId) {
            console.error('Client ID não encontrado. Por favor, faça o login.')
            return
        }

        const orderItem = {
            clientId,
            items: [
                {
                    product: product._id,
                    quantity: 1
                }
            ]
        }
        this.orderService.createOrder(orderItem)
            .subscribe({
                next: () => {
                    console.log("Pedido criado com sucesso")
                },
                error: (err) => {
                    console.error("Erro ao criar produto", err)
                }
            })
    }
}