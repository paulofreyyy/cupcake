import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { FormsModule } from "@angular/forms";
import { OrderService } from "../../services/order.service";
import { Order } from "../../shared/models/order.model";
import { NotificationHelper } from "../../shared/helpers/notification-helpers";
import { Router } from "@angular/router";
import { StatusChipComponent } from "../../components/statusChip/status-chip.component";

@Component({
    selector: 'app-home',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css'],
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
        StatusChipComponent
    ],
})
export class OrdersComponent implements OnInit {
    private ordersService = inject(OrderService);
    private notificationHelper = inject(NotificationHelper);
    public router = inject(Router);
    clientId = localStorage.getItem('clientId') || '';

    Orders: Order[] = []

    ngOnInit(): void {
        this.loadOrders();
    }

    loadOrders() {
        if (!this.clientId) return;

        this.ordersService.findUserOrderHistory(this.clientId).subscribe({
            next: (orders: Order[]) => {
                if (orders) {
                    this.Orders = orders;
                } else {
                    this.Orders = [];
                }
            },
            error: (err) => this.notificationHelper.showError(err.error.message)
        })
    }

    checkoutOrders() {
        return this.Orders.filter(order => order.status === 'checkout')
    }

    hasNoCheckoutOrder() {
        return this.Orders.filter(order => order.status !== 'checkout' && order.status !== 'pending')
    }
}