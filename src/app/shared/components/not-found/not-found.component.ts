import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';

/**
 * 404 Not Found page component
 * Displays when user navigates to undefined routes
 * @author Matias Aliaga
 */
@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        HeaderComponent
    ],
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
    constructor(private router: Router) { }

    goHome(): void {
        this.router.navigate(['/documentos']);
    }

    goBack(): void {
        window.history.back();
    }
}
