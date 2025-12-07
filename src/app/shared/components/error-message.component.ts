import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

/**
 * Reusable error message display component
 * @author Matias Aliaga
 */
@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    @if (message) {
      <div class="error-container" role="alert">
        <mat-icon class="error-icon">error_outline</mat-icon>
        <span class="error-text">{{ message }}</span>
      </div>
    }
  `,
  styles: [`
    .error-container {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      background-color: #fdecea;
      border: 1px solid #f5c6cb;
      border-radius: 4px;
      color: #721c24;
      margin-bottom: 16px;
    }

    .error-icon {
      color: #d32f2f;
      flex-shrink: 0;
    }

    .error-text {
      font-size: 14px;
      line-height: 1.4;
    }
  `]
})
export class ErrorMessageComponent {
  @Input() message: string | null = null;
}
