import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

/**
 * Service for displaying user notifications
 * Uses Angular Material Snackbar
 * @author Matias Aliaga
 */
@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private snackBar = inject(MatSnackBar);

    private defaultConfig: MatSnackBarConfig = {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
    };

    /**
     * Display success notification
     */
    success(message: string, duration?: number): void {
        this.snackBar.open(message, 'Cerrar', {
            ...this.defaultConfig,
            duration: duration || this.defaultConfig.duration,
            panelClass: ['snackbar-success']
        });
    }

    /**
     * Display error notification
     */
    error(message: string, duration?: number): void {
        this.snackBar.open(message, 'Cerrar', {
            ...this.defaultConfig,
            duration: duration || this.defaultConfig.duration,
            panelClass: ['snackbar-error']
        });
    }

    /**
     * Display warning notification
     */
    warning(message: string, duration?: number): void {
        this.snackBar.open(message, 'Cerrar', {
            ...this.defaultConfig,
            duration: duration || this.defaultConfig.duration,
            panelClass: ['snackbar-warning']
        });
    }

    /**
     * Display info notification
     */
    info(message: string, duration?: number): void {
        this.snackBar.open(message, 'Cerrar', {
            ...this.defaultConfig,
            duration: duration || this.defaultConfig.duration,
            panelClass: ['snackbar-info']
        });
    }
}
