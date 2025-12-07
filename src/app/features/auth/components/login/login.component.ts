import { Component, signal, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { LoginFormComponent } from '../ui/login-form/login-form.component';
import { LoginCredentials } from '../../../../core/models/auth.model';

/**
 * Smart container component for login functionality
 * Manages authentication state and form submission
 * @author Matias Aliaga
 */
@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LoginFormComponent
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private notificationService = inject(NotificationService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    // Signals for reactive state
    isLoading = signal(false);
    errorMessage = signal<string | null>(null);

    // Reactive form
    loginForm: FormGroup;

    constructor() {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            rememberMe: [false]
        });
    }

    ngOnInit(): void {
        // Check if already authenticated
        if (this.authService.isAuthenticated()) {
            this.navigateToReturnUrl();
        }
    }

    onSubmit(): void {
        if (this.loginForm.invalid || this.isLoading()) {
            return;
        }

        this.isLoading.set(true);
        this.errorMessage.set(null);

        const credentials: LoginCredentials = {
            username: this.loginForm.value.username,
            password: this.loginForm.value.password
        };

        this.authService.login(credentials).subscribe({
            next: () => {
                this.isLoading.set(false);
                this.notificationService.success('Sesión iniciada correctamente');
                this.navigateToReturnUrl();
            },
            error: (error) => {
                this.isLoading.set(false);

                // Set error message based on error type
                let errorMsg = 'Error al iniciar sesión. Por favor, verifique sus credenciales.';

                if (error.error?.error_description) {
                    errorMsg = error.error.error_description;
                } else if (error.error?.message) {
                    errorMsg = error.error.message;
                } else if (error.status === 400) {
                    errorMsg = 'Usuario o contraseña incorrectos.';
                } else if (error.status === 0) {
                    errorMsg = 'No se pudo conectar con el servidor.';
                }

                this.errorMessage.set(errorMsg);
            }
        });
    }

    private navigateToReturnUrl(): void {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/documentos';
        this.router.navigate([returnUrl]);
    }
}
