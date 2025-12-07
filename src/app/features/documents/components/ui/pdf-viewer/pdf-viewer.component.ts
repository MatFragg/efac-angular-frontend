import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SafeUrlPipe } from '../../../../../shared/pipes/safe-url.pipe';

/**
 * Presentational component for displaying PDF documents in iframe
 * @author Matias Aliaga
 */
@Component({
    selector: 'app-pdf-viewer',
    standalone: true,
    imports: [CommonModule, MatIconModule, SafeUrlPipe],
    templateUrl: './pdf-viewer.component.html',
    styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent {
    @Input() pdfUrl: string | null = null;
}
