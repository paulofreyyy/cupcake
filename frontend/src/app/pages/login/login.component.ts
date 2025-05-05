import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    standalone: true,
    selector: 'app-login',
    imports: [CommonModule, FormsModule],
    template: `
    <form (ngSubmit)="submit()">
      <input [(ngModel)]="email" name="email" placeholder="Email" required>
      <input [(ngModel)]="password" name="password" type="password" placeholder="Senha" required>
      <button type="submit">Login</button>
    </form>
  `
})
export class LoginComponent {
    private auth = inject(AuthService);
    private router = inject(Router);

    email = '';
    password = '';

    submit() {
        this.auth.login({ email: this.email, password: this.password }).subscribe({
            next: (res) => {
                localStorage.setItem('token', res.token); // Se o backend retornar token
                this.router.navigate(['/']);
            },
            error: (err) => alert('Credenciais inválidas')
        });
    }
}
