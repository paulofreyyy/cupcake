import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { OrderItem } from '../../shared/models/order.model';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-checkout',
    standalone: true,
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatListModule,
        ReactiveFormsModule
    ],
})
export class CheckoutComponent implements OnInit {
    cartItems: OrderItem[] = []
    total = 0;
    frete = 5
    addressForm!: FormGroup;
    private fb = inject(FormBuilder)
    private ordersService = inject(OrderService)
    private route = inject(ActivatedRoute)
    orderId = this.route.snapshot.paramMap.get('orderId')!

    ngOnInit(): void {
        this.addressForm = this.fb.group({
            street: [''],
            number: [''],
            district: [''],
            city: [''],
            state: [''],
            zip: [''],
            paymentMethod: ['pix'],
        });
        this.ordersService.getOrderById(this.orderId).subscribe({
            next: (data) => {
                this.cartItems = data.items
                this.total = data.total
            },
            error:() =>{
                console.log("Erro ao buscar o pedido")
            }
        })

        // carregar carrinho e total
    }

    confirmOrder() {
        const address = this.addressForm.value;
        // enviar dados + cartItems para o backend
        console.log('Confirmando pedido com:', { address, cartItems: this.cartItems });
    }
}
