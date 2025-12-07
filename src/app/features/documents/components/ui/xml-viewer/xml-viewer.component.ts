import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeViewerComponent } from '../code-viewer/code-viewer.component';

/**
 * Presentational component for displaying XML content with syntax highlighting
 * @author Matias Aliaga
 */
@Component({
    selector: 'app-xml-viewer',
    standalone: true,
    imports: [CommonModule, CodeViewerComponent],
    template: `
        <app-code-viewer 
            [content]="xmlContent || ''" 
            language="xml"
            [filename]="'factura_' + getTimestamp() + '.xml'">
        </app-code-viewer>
    `,
    styles: [`
        :host {
            display: block;
            height: 100%;
        }
    `]
})
export class XmlViewerComponent {
    @Input() xmlContent: string | null = '';

    getTimestamp(): string {
        return new Date().getTime().toString();
    }
}
