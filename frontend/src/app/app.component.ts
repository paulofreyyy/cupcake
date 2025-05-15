import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from "./components/menu/menu.component";
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MenuComponent, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    showMenu = true;

    constructor(private router: Router) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
            // Esconde menu se estiver na rota /login
            this.showMenu = event.url !== '/login';
        });
    }
}