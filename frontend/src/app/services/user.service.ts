import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    private api = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    getProfile(userId: string): Observable<any> {
        return this.http.get(`${this.api}/user/${userId}`)
    }
}