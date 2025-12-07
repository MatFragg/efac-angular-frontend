import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorMessageComponent } from '../../../../../shared/components/error-message.component';

/**
 * Presentational login form component
 * Pure UI component with no service dependencies
 * @author Matias Aliaga
 */
@Component({
    selector: 'app-login-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatProgressSpinnerModule,
        ErrorMessageComponent
    ],
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnChanges {
    @Input() loginForm!: FormGroup;
    @Input() isLoading = false;
    @Input() errorMessage: string | null = null;

    @Output() submitForm = new EventEmitter<void>();

    hidePassword = true;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['isLoading'] && this.loginForm) {
            if (this.isLoading) {
                this.loginForm.get('username')?.disable();
                this.loginForm.get('password')?.disable();
                this.loginForm.get('rememberMe')?.disable();
            } else {
                this.loginForm.get('username')?.enable();
                this.loginForm.get('password')?.enable();
                this.loginForm.get('rememberMe')?.enable();
            }
        }
    }

    onSubmit(): void {
        if (this.loginForm.valid && !this.isLoading) {
            this.submitForm.emit();
        }
    }

    togglePasswordVisibility(): void {
        this.hidePassword = !this.hidePassword;
    }
}
