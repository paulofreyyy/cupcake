import { Component, Input } from "@angular/core";
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
export class QuantityInputComponent{
    @Input() value: number = 1;
    @Input() min: number = 1;
    @Input() max: number = 100;

    decrease() {
        if(this.value > this.min) this.value--;
    }

    increase(){
        if(this.value < this.max) this.value++;
    }
}