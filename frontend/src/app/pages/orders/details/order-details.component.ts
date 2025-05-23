import { CommonModule, Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../shared/models/order.model';
import { OrderService } from '../../../services/order.service';
import { StatusChipComponent } from '../../../components/statusChip/status-chip.component';
import { NotificationHelper } from '../../../shared/helpers/notification-helpers';
import { MatChipsModule } from '@angular/material/chips';
import { LoadingHelper } from '../../../shared/helpers/loading.helper';
import { LoadingComponent } from "../../../components/loading/loading.component";

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
    ReactiveFormsModule,
    StatusChipComponent,
    MatChipsModule,
    LoadingComponent
],
})
export class OrderDetailComponent implements OnInit {
    Order!: Order 
    private ordersService = inject(OrderService)
    private route = inject(ActivatedRoute)
    private notificationHelper = inject(NotificationHelper)
    public location = inject(Location)
    private loadingHelper = inject(LoadingHelper)
    orderId = this.route.snapshot.paramMap.get('orderId')!

    ngOnInit(): void {
        this.loadingHelper.show();
        this.ordersService.getOrderById(this.orderId).subscribe({
            next: (data) => {
                this.Order = data
            },
            error: (err) => {
                this.notificationHelper.showError(err.error.message)
            },
            complete:() =>{
                this.loadingHelper.hide();
            },
        })
    }
}
