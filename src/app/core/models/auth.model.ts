/**
 * Authentication domain models
 * @author Matias Aliaga
 */

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope?: string;
    jti?: string;
}

export interface TokenPayload {
    user_name: string;
    scope: string[];
    exp: number;
    authorities: string[];
    jti: string;
    client_id: string;
}

export interface User {
    username: string;
    authorities: string[];
}
