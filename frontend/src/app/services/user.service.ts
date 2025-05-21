import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    private api = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getProfile(userId: string): Observable<any> {
        return this.http.get(`${this.api}/user/${userId}`)
    }
}