import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentService } from '../../services/document.service';
import { DocumentData } from '../../models/document.model';
import { PdfViewerComponent } from '../ui/pdf-viewer/pdf-viewer.component';
import { XmlViewerComponent } from '../ui/xml-viewer/xml-viewer.component';
import { CdrViewerComponent } from '../ui/cdr-viewer/cdr-viewer.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner.component';
import { ErrorMessageComponent } from '../../../../shared/components/error-message.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';

/**
 * Unified landing and viewer component for documents feature
 * Allows users to search for documents and view results inline
 * Supports URL-based routing: /documents/{ticketId}
 * @author Matias Aliaga
 */
@Component({
    selector: 'app-documents-landing',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        PdfViewerComponent,
        XmlViewerComponent,
        CdrViewerComponent,
        LoadingSpinnerComponent,
        ErrorMessageComponent,
        HeaderComponent
    ],
    templateUrl: './documents-landing.component.html',
    styleUrls: ['./documents-landing.component.scss']
})
export class DocumentsLandingComponent implements OnInit {
    private fb = inject(FormBuilder);
    private documentService = inject(DocumentService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    ticketForm: FormGroup;

    documentData = signal<DocumentData | null>(null);
    isLoading = signal(false);
    errorMessage = signal<string | null>(null);
    activeTabIndex = 0;
    currentTicket = signal<string>('');

    constructor() {
        this.ticketForm = this.fb.group({
            ticket: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const ticketParam = params.get('ticket');
            if (ticketParam) {
                this.ticketForm.patchValue({ ticket: ticketParam });
                this.currentTicket.set(ticketParam);
                this.loadDocuments(ticketParam);
            }
        });
    }

    onSubmit(): void {
        if (this.ticketForm.valid) {
            const ticket = this.ticketForm.value.ticket.trim();
            this.currentTicket.set(ticket);
            this.updateUrl(ticket);
            this.loadDocuments(ticket);
        }
    }

    private updateUrl(ticket: string): void {
        this.router.navigate(['/documentos', ticket], { replaceUrl: false });
    }

    private loadDocuments(ticket: string): void {
        this.isLoading.set(true);
        this.errorMessage.set(null);
        this.documentData.set(null);

        this.documentService.getDocuments(ticket).subscribe({
            next: (data) => {
                this.documentData.set(data);
                this.isLoading.set(false);

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
                `Factura_${this.currentTicket()}.pdf`
            );
        }
    }

    downloadXml(): void {
        const data = this.documentData();
        if (data?.urls.xmlContent) {
            this.documentService.downloadTextAsFile(
                data.urls.xmlContent,
                `Factura_${this.currentTicket()}.xml`
            );
        }
    }

    downloadCdr(): void {
        const data = this.documentData();
        if (data?.urls.cdrContent) {
            this.documentService.downloadTextAsFile(
                data.urls.cdrContent,
                `CDR_${this.currentTicket()}.xml`
            );
        }
    }
}
