import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeViewerComponent } from '../code-viewer/code-viewer.component';

/**
 * Presentational component for displaying CDR (Constancia de Recepción) content
 * @author Matias Aliaga
 */
@Component({
    selector: 'app-cdr-viewer',
    standalone: true,
    imports: [CommonModule, CodeViewerComponent],
    template: `
        <app-code-viewer 
            [content]="cdrContent || ''" 
            language="xml"
            [filename]="'cdr_' + getTimestamp() + '.xml'">
        </app-code-viewer>
    `,
    styles: [`
        :host {
            display: block;
            height: 100%;
        }
    `]
})
export class CdrViewerComponent {
    @Input() cdrContent: string | null = '';

    getTimestamp(): string {
        return new Date().getTime().toString();
    }
}
