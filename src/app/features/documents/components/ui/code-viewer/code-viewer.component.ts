import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Highlight } from 'ngx-highlightjs';
import { NotificationService } from '../../../../../core/services/notification.service';

/**
 * Reusable code viewer component with syntax highlighting
 * Provides copy and download functionality for XML/CDR content
 * @author Matias Aliaga
 */
@Component({
    selector: 'app-code-viewer',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        Highlight
    ],
    templateUrl: './code-viewer.component.html',
    styleUrls: ['./code-viewer.component.scss']
})
export class CodeViewerComponent {
    @Input() content: string = '';
    @Input() language: string = 'xml';
    @Input() filename: string = 'document.xml';

    private notificationService = inject(NotificationService);

    get lineCount(): number {
        return this.content ? this.content.split('\n').length : 0;
    }

    copyToClipboard(): void {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(this.content).then(() => {
                this.notificationService.success('Código copiado al portapapeles');
            }).catch((err: Error) => {
                console.error('Error copying to clipboard:', err);
                this.fallbackCopyToClipboard();
            });
        } else {
            this.fallbackCopyToClipboard();
        }
    }

    private fallbackCopyToClipboard(): void {
        const textArea = document.createElement('textarea');
        textArea.value = this.content;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                this.notificationService.success('Código copiado al portapapeles');
            } else {
                this.notificationService.error('No se pudo copiar el código');
            }
        } catch (err) {
            console.error('Fallback: Could not copy text', err);
            this.notificationService.error('No se pudo copiar el código');
        }

        document.body.removeChild(textArea);
    }

    downloadFile(): void {
        const blob = new Blob([this.content], {
            type: this.language === 'xml' ? 'application/xml' : 'text/plain'
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = this.filename;
        link.click();
        window.URL.revokeObjectURL(url);

        this.notificationService.success(`Archivo ${this.filename} descargado`);
    }
}
