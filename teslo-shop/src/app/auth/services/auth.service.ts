import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import type { AuthResponse } from '@auth/interfaces/auth-response.interface';
import type { User } from '@auth/interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({providedIn: 'root'})
export class AuthService {
    private _authStatus = signal<AuthStatus>('checking');
    private _user = signal<User|null>(null);
    private _token = signal<string|null>(null);
    private http = inject(HttpClient);

    authStatus = computed<AuthStatus>(() => {
        if(this._authStatus() === 'checking') return 'checking';
        return this._user() ? 'authenticated' : 'not-authenticated';
    });

    user = computed<User|null>(() => this._user());
    token = computed<string|null>(() => this._token());

    login(email: string, password: string): Observable<boolean> {
        return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, { email, password }).pipe(
            tap(resp => {
                this._user.set(resp.user);
                this._token.set(resp.token);
                this._authStatus.set('authenticated');

                localStorage.setItem('token', resp.token);
            }),
            map(() => true),
            catchError((error: any) => {
                this._authStatus.set('not-authenticated');
                this._user.set(null);
                this._token.set(null);
                localStorage.removeItem('token');
                return of(false);
            })
        )
    }
}