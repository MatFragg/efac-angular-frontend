import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { environment } from '../../../environments/environment';

/**
 * HTTP Interceptor that automatically attaches Bearer token to requests
 * Skips OAuth token endpoint to avoid infinite loop
 * @author Matias Aliaga
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenService = inject(TokenService);

    // Skip token injection for OAuth token endpoint
    const isTokenEndpoint = req.url.includes(environment.oauth.tokenEndpoint);
    if (isTokenEndpoint) {
        return next(req);
    }

    // Get token and attach if available
    const token = tokenService.getToken();
    if (token && !tokenService.isTokenExpired()) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(req);
};
