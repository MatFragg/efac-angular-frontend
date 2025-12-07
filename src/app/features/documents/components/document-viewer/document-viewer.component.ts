import { Component, signal, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DocumentService } from '../../services/document.service';
import { DocumentData } from '../../models/document.model';
import { PdfViewerComponent } from '../ui/pdf-viewer/pdf-viewer.component';
import { XmlViewerComponent } from '../ui/xml-viewer/xml-viewer.component';
import { CdrViewerComponent } from '../ui/cdr-viewer/cdr-viewer.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner.component';
import { ErrorMessageComponent } from '../../../../shared/components/error-message.component';

/**
 * Smart container component for document viewer
 * Manages document fetching and tab navigation
 * @author Matias Aliaga
 */
@Component({
    selector: 'app-document-viewer',
    standalone: true,
    imports: [
        CommonModule,
        MatTabsModule,
        MatButtonModule,
        MatIconModule,
        PdfViewerComponent,
        XmlViewerComponent,
        CdrViewerComponent,
        LoadingSpinnerComponent,
        ErrorMessageComponent
    ],
    templateUrl: './document-viewer.component.html',
    styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnInit {
    private documentService = inject(DocumentService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    // Signals for reactive state
    documentData = signal<DocumentData | null>(null);
    isLoading = signal(false);
    errorMessage = signal<string | null>(null);
    activeTabIndex = signal(0);
    ticket = signal<string>('');

    ngOnInit(): void {
        // Extract ticket from route parameters
        const ticketParam = this.route.snapshot.paramMap.get('ticket');

        if (!ticketParam) {
            this.errorMessage.set('No se proporcionó un ticket válido');
            return;
        }

        this.ticket.set(ticketParam);
        this.loadDocuments(ticketParam);
    }

    private loadDocuments(ticket: string): void {
        this.isLoading.set(true);
        this.errorMessage.set(null);

        this.documentService.getDocuments(ticket).subscribe({
            next: (data) => {
                this.documentData.set(data);
                this.isLoading.set(false);

                // If no documents available, show error
                if (!data.urls.pdfUrl && !data.urls.xmlContent && !data.urls.cdrContent) {
                    this.errorMessage.set('No se encontraron documentos para este ticket');
                }
            },
            error: (error) => {
                this.isLoading.set(false);
                this.errorMessage.set('Error al cargar los documentos. Por favor, intente nuevamente.');
                console.error('Error loading documents:', error);
            }
        });
    }

    downloadPdf(): void {
        const data = this.documentData();
        if (data?.urls.pdfUrl) {
            this.documentService.downloadFile(
                data.urls.pdfUrl,
                `Factura_${this.ticket()}.pdf`
            );
        }
    }

    downloadXml(): void {
        const data = this.documentData();
        if (data?.urls.xmlContent) {
            this.documentService.downloadTextAsFile(
                data.urls.xmlContent,
                `Factura_${this.ticket()}.xml`
            );
        }
    }

    downloadCdr(): void {
        const data = this.documentData();
        if (data?.urls.cdrContent) {
            this.documentService.downloadTextAsFile(
                data.urls.cdrContent,
                `CDR_${this.ticket()}.xml`
            );
        }
    }

    goBack(): void {
        this.router.navigate(['/']);
    }
}
