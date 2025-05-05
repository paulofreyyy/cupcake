import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private api = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    login(data: { email: string; password: string }): Observable<any> {
        return this.http.post(`${this.api}/auth/login`, data,).pipe(
            tap((response: any) => {
                if(response && response.access_token){
                    localStorage.setItem('token', response.access_token)
                }
            })
        );
    }

    register(data: { name: string; email: string; password: string }): Observable<any> {
        return this.http.post(`${this.api}/auth/register`, data);
    }
}
