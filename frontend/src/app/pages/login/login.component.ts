import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
    standalone: true,
    selector: 'app-login',
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    private auth = inject(AuthService);
    private router = inject(Router);

    email = '';
    password = '';

    submit() {
        this.auth.login({ email: this.email, password: this.password }).subscribe({
            next: (res) => {
                this.router.navigate(['/']);
            },
            error: (err) => alert('Credenciais inválidas')
        });
    }
}
