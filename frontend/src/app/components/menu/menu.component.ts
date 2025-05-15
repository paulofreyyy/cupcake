import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatBadgeModule } from "@angular/material/badge";
import { RouterModule } from "@angular/router";
import { CartService } from "../../services/cart.service";

@Component({
    selector: 'app-menu',
    standalone: true,
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    imports: [
        MatToolbarModule,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        RouterModule,
        MatBadgeModule,
    ]
})
export class MenuComponent {
    private cartService = inject(CartService)

    itemsCount$ = this.cartService.itemsCount$;
}
