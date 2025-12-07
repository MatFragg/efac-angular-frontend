import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { TokenService } from '../services/token.service';

/**
 * HTTP Interceptor for global error handling
 * Handles common HTTP errors and provides user feedback
 * @author Matias Aliaga
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const notificationService = inject(NotificationService);
    const tokenService = inject(TokenService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = 'Ha ocurrido un error inesperado';

            switch (error.status) {
                case 401:
                    errorMessage = 'Sesión expirada. Por favor, inicie sesión nuevamente.';
                    tokenService.removeToken();
                    router.navigate(['/auth/login']);
                    notificationService.error(errorMessage);
                    break;

                case 403:
                    errorMessage = 'No tiene permisos para realizar esta acción.';
                    notificationService.error(errorMessage);
                    break;

                case 404:
                    errorMessage = 'Recurso no encontrado.';
                    notificationService.error(errorMessage);
                    break;

                case 500:
                    errorMessage = 'Error del servidor. Por favor, intente más tarde.';
                    notificationService.error(errorMessage);
                    break;

                case 0:
                    errorMessage = 'Error de conexión. Verifique su conexión a internet.';
                    notificationService.error(errorMessage);
                    break;

                default:
                    if (error.error?.error_description) {
                        errorMessage = error.error.error_description;
                    } else if (error.error?.message) {
                        errorMessage = error.error.message;
                    }
                    notificationService.error(errorMessage);
            }

            console.error('HTTP Error:', {
                status: error.status,
                message: errorMessage,
                url: req.url
            });

            return throwError(() => error);
        })
    );
};
