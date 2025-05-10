import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

@Component({
    selector: 'app-quantity-input',
    standalone: true,
    templateUrl: './quantity-input.component.html',
    styleUrl: './quantity-input.component.css',
    imports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
    ]
})
export class QuantityInputComponent {
    @Input() value: number = 1;
    @Input() min: number = 1;
    @Input() max: number = 100;

    @Output() valueChange = new EventEmitter<number>();

    decrease() {
        if (this.value > this.min) {
            this.value--;
            this.valueChange.emit(this.value);  // Emite o novo valor
        }
    }

    increase() {
        if (this.value < this.max) {
            this.value++;
            this.valueChange.emit(this.value);  // Emite o novo valor
        }
    }
}