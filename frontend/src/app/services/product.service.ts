import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../shared/models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = environment.apiUrl

    constructor(private http: HttpClient) { }

    createProduct(product: Product): Observable<Product>{
        return this.http.post<Product>(`${this.apiUrl}/products`, product)
    }

    getProducts(): Observable<Product[]>{
        return this.http.get<Product[]>(`${this.apiUrl}/products`)
    }

    getProductById(id: string): Observable<Product>{
        return this.http.get<Product>(`${`${this.apiUrl}/products`}/${id}`)
    }

    updateProduct(id: string, product: Product): Observable<Product>{
        return this.http.put<Product>(`${`${this.apiUrl}/products`}/${id}`, product)
    }

    deleteProduct(id: string): Observable<Product>{
        return this.http.delete<Product>(`${`${this.apiUrl}/products`}/${id}`)
    }
}
