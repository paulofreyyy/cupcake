
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
    selector: 'app-register',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule
    ],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    private auth = inject(AuthService);
    public router = inject(Router);

    name = '';
    email = '';
    password = '';

    submit() {
        this.auth.register({ name: this.name, email: this.email, password: this.password }).subscribe({
            next: () => this.router.navigate(['/login']),
            error: () => alert('Erro ao registrar. Tente novamente.')
        });
    }
}
