import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../shared/models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = 'http://localhost:3000/products'

    constructor(private http: HttpClient) { }

    createProduct(product: Product): Observable<Product>{
        return this.http.post<Product>(this.apiUrl, product)
    }

    getProducts(): Observable<Product[]>{
        return this.http.get<Product[]>(this.apiUrl)
    }

    getProductById(id: string): Observable<Product>{
        return this.http.get<Product>(`${this.apiUrl}/${id}`)
    }

    updateProduct(id: string, product: Product): Observable<Product>{
        return this.http.put<Product>(`${this.apiUrl}/${id}`, product)
    }

    deleteProduct(id: string): Observable<Product>{
        return this.http.delete<Product>(`${this.apiUrl}/${id}`)
    }
}
