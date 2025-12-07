import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Reusable loading spinner component
 * @author Matias Aliaga
 */
@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="spinner-container" [class]="'spinner-' + size">
      <mat-spinner [diameter]="diameter" [strokeWidth]="strokeWidth"></mat-spinner>
    </div>
  `,
  styles: [`
    .spinner-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    .spinner-small {
      padding: 10px;
    }

    .spinner-large {
      padding: 40px;
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  get diameter(): number {
    switch (this.size) {
      case 'small': return 24;
      case 'large': return 64;
      default: return 40;
    }
  }

  get strokeWidth(): number {
    switch (this.size) {
      case 'small': return 2;
      case 'large': return 4;
      default: return 3;
    }
  }
}
