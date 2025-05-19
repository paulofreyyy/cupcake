import { User } from './../../shared/models/user.model';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NotificationHelper } from '../../shared/helpers/notification-helpers';
import { UserService } from '../../services/user.service';

@Component({
    standalone: true,
    selector: 'app-profile',
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
    public router = inject(Router);
    public userService = inject(UserService);
    private notificationHelper = inject(NotificationHelper);
    userId = localStorage.getItem('clientId') || '';
    userData: User | null = null

    ngOnInit(): void {
        this.userService.getProfile(this.userId).subscribe({
            next: (data: User) => {
                this.userData = data
            },
            error: (err) => this.notificationHelper.showError(err.error.message)
        })
    }
}
