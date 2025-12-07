import { Injectable } from '@angular/core';

/**
 * Service for managing authentication tokens
 * Uses sessionStorage for enhanced security (cleared on browser close)
 * @author Matias Aliaga
 */
@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private readonly TOKEN_KEY = 'efact_auth_token';

    /**
     * Save token to session storage
     */
    saveToken(token: string): void {
        sessionStorage.setItem(this.TOKEN_KEY, token);
    }

    /**
     * Retrieve token from session storage
     */
    getToken(): string | null {
        return sessionStorage.getItem(this.TOKEN_KEY);
    }

    /**
     * Remove token from session storage
     */
    removeToken(): void {
        sessionStorage.removeItem(this.TOKEN_KEY);
    }

    /**
     * Check if a valid token exists
     */
    hasToken(): boolean {
        return this.getToken() !== null;
    }

    /**
     * Decode JWT token payload (without verification)
     * Note: This is for reading claims only, not for security validation
     */
    decodeToken<T = any>(token?: string): T | null {
        const tokenToUse = token || this.getToken();
        if (!tokenToUse) return null;

        try {
            const parts = tokenToUse.split('.');
            if (parts.length !== 3) return null;

            const payload = parts[1];
            const decoded = atob(payload);
            return JSON.parse(decoded) as T;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

    /**
     * Check if token is expired
     */
    isTokenExpired(): boolean {
        const token = this.getToken();
        if (!token) return true;

        const payload = this.decodeToken(token);
        if (!payload || !payload.exp) return true;

        const expirationDate = new Date(payload.exp * 1000);
        return expirationDate <= new Date();
    }
}
