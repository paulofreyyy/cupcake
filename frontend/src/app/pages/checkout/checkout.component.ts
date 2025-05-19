import { CommonModule, Location } from '@angular/common';
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
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationHelper } from '../../shared/helpers/notification-helpers';

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
    private router = inject(Router)
    public location = inject(Location)
    public notificationHelper = inject(NotificationHelper)
    orderId = this.route.snapshot.paramMap.get('orderId')!

    ngOnInit(): void {
        this.addressForm = this.fb.group({
            street: ['Rua das Fiandeiras'],
            number: ['100'],
            district: ['Vila Olímpia'],
            city: ['São Paulo'],
            state: ['SP'],
            zip: ['04545005'],
            paymentMethod: ['pix'],
        });
        this.ordersService.getOrderById(this.orderId).subscribe({
            next: (data) => {
                this.cartItems = data.items
                this.total = data.orderTotal
            },
            error: () => {
                console.log("Erro ao buscar o pedido")
            }
        })

        // carregar carrinho e total
    }

    confirmOrder() {
        const formValues = this.addressForm.value;

        const address = `${formValues.street}, ${formValues.number} - ${formValues.district}, ${formValues.city} - ${formValues.state}, ${formValues.zip}`;

        const payload = {
            address,
            status: 'paid' as const,
            payment: {
                paymentMethod: formValues.paymentMethod,
                shippingFee: this.frete,
                total: this.total + this.frete,
            },
        };

        this.ordersService.orderPayment(this.orderId, payload).subscribe({
            next: () => {
                this.notificationHelper.showSuccess("Pedido confirmado!")
                this.router.navigate(['pedidos'])
            },
            error: (err) => {
                this.notificationHelper.showError(err.error.message)
            }
        });
    }

    cancelOrder(){
        this.ordersService.cancelOrder(this.orderId).subscribe({
            next: () => {
                this.notificationHelper.showSuccess("Pedido cancelado com sucesso!")
                this.location.back()
            },
            error: (err) =>{
                this.notificationHelper.showError(err.error.message)
            }
        })
    }
}
