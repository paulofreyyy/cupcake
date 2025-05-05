import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // Verifica se o usuário está autenticado
        const token = localStorage.getItem('token')
        if (token) {
            return true;
        }

        // Caso não esteja autenticado, redireciona para a página de login
        this.router.navigate(['/login']);
        return false;
    }
}
