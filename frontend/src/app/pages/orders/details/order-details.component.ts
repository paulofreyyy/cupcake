import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute } from '@angular/router';
import { OrderItem } from '../../../shared/models/order.model';
import { OrderService } from '../../../services/order.service';

@Component({
    selector: 'app-checkout',
    standalone: true,
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.css'],
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
export class OrderDetailComponent implements OnInit {
    orderItems: OrderItem[] = []
    total = 0;
    frete = 5;
    address = '';
    payment = '';
    private ordersService = inject(OrderService)
    private route = inject(ActivatedRoute)
    orderId = this.route.snapshot.paramMap.get('orderId')!

    ngOnInit(): void {
        this.ordersService.getOrderById(this.orderId).subscribe({
            next: (data) => {
                this.orderItems = data.items
                this.total = data.orderTotal || data.payment.total
                this.address = data.address
                this.payment = data.payment.paymentMethod
            },
            error: () => {
                console.log("Erro ao buscar o pedido")
            }
        })
    }
}
