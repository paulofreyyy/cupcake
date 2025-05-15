import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatChipsModule } from "@angular/material/chips";

@Component({
    selector: 'app-status-chip',
    standalone: true,
    templateUrl: './status-chip.component.html',
    styleUrl: './status-chip.component.css',
    imports: [
        CommonModule,
        MatChipsModule
    ]
})
export class StatusChipComponent {
    @Input() status: 'pending' | 'paid' | 'checkout' | 'cancelled' = 'pending';

    get backgroundColor(): string {
        switch (this.status) {
            case 'paid': return '#82bf8f';
            case 'checkout': return '#9ca5ff';
            case 'cancelled': return '#ff9d9d';
            case 'pending': return '#ffc766';
            default: return '#FFF';
        }
    }

    get textColor(): string {
        return this.status === 'pending' ? '#000' : '#fff';
    }

    get label(): string {
        switch (this.status) {
            case 'paid': return 'Pago';
            case 'checkout': return 'Checkout';
            case 'cancelled': return 'Cancelado';
            case 'pending': return 'Pendente';
            default: return this.status;
        }
    }
}