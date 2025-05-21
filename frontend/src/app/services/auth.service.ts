import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private api = environment.apiUrl;

    constructor(private http: HttpClient) { }

    login(data: { email: string; password: string }): Observable<any> {
        return this.http.post(`${this.api}/auth/login`, data,).pipe(
            tap((response: any) => {
                if (response && response.access_token) {
                    localStorage.setItem('token', response.access_token)
                    localStorage.setItem('clientId', response.clientId)
                }
            })
        );
    }

    private isTokenExpired(token: string): boolean {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiry = payload.exp;
            const now = Math.floor(Date.now() / 1000);
            return expiry < now;
        } catch (e) {
            return true;
        }
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !!token && !this.isTokenExpired(token);
    }

    register(data: { name: string; email: string; password: string }): Observable<any> {
        return this.http.post(`${this.api}/auth/register`, data);
    }

    logout(): void {
        localStorage.removeItem('token');
    }
}
