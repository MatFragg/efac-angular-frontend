import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';
import { LoginCredentials, AuthResponse, User, TokenPayload } from '../models/auth.model';

/**
 * Service for managing authentication state and operations
 * Uses Angular Signals for reactive state management
 * @author Matias Aliaga
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private tokenService = inject(TokenService);
    private router = inject(Router);

    private _isAuthenticated = signal(this.tokenService.hasToken() && !this.tokenService.isTokenExpired());
    public isAuthenticated = this._isAuthenticated.asReadonly();

    private _currentUser = signal<User | null>(this.loadUserFromToken());
    public currentUser = this._currentUser.asReadonly();

    /**
     * Authenticate user with username and password
     * Uses OAuth2 password grant flow
     */
    login(credentials: LoginCredentials): Observable<AuthResponse> {
        const body = new URLSearchParams({
            grant_type: 'password',
            username: credentials.username,
            password: credentials.password
        });

        const url = `${environment.apiUrl}${environment.oauth.tokenEndpoint}`;

        return this.http.post<AuthResponse>(
            url,
            body.toString(),
            {
                headers: {
                    'Authorization': `Basic ${environment.oauth.clientCredentials}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).pipe(
            tap(response => {
                this.tokenService.saveToken(response.access_token);
                this._isAuthenticated.set(true);
                this._currentUser.set(this.loadUserFromToken());
            }),
            catchError(error => {
                this._isAuthenticated.set(false);
                this._currentUser.set(null);
                return throwError(() => error);
            })
        );
    }

    /**
     * Log out current user
     * Clears token and navigates to login page
     */
    logout(): void {
        this.tokenService.removeToken();
        this._isAuthenticated.set(false);
        this._currentUser.set(null);
        this.router.navigate(['/auth/login']);
    }

    /**
     * Load user information from stored token
     */
    private loadUserFromToken(): User | null {
        const payload = this.tokenService.decodeToken<TokenPayload>();
        if (!payload) return null;

        return {
            username: payload.user_name,
            authorities: payload.authorities || []
        };
    }

    /**
     * Check if user has specific authority
     */
    hasAuthority(authority: string): boolean {
        const user = this._currentUser();
        return user?.authorities?.includes(authority) ?? false;
    }
}
