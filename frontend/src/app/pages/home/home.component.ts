import { Component, OnInit } from "@angular/core";
import { Product } from "../../shared/models/product.model";
import { ProductService } from "../../services/product.service";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";

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
        FormsModule
    ],
})
export class HomeComponent implements OnInit {
    products: Product[] = [];
    loading = false;
    error: string | null = null;

    constructor(private productService: ProductService) { }

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
}