import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { DocumentData, DocumentUrls, DocumentMetadata } from '../models/document.model';

/**
 * Service for fetching and managing electronic invoice documents
 * @author Matias Aliaga
 */
@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    private http = inject(HttpClient);
    private baseUrl = `${environment.apiUrl}/v1`;

    /**
     * Fetch all documents for a given ticket
     * PDF returns blob URL, XML/CDR return text content
     */
    getDocuments(ticket: string): Observable<DocumentData> {
        return forkJoin({
            pdfUrl: this.getPdfUrl(ticket),
            xmlContent: this.getXmlContent(ticket),
            cdrContent: this.getCdrContent(ticket)
        }).pipe(
            map(results => ({
                urls: {
                    pdfUrl: results.pdfUrl,
                    xmlContent: results.xmlContent,
                    cdrContent: results.cdrContent
                },
                metadata: {
                    ticket
                }
            }))
        );
    }

    /**
     * Fetch PDF document and create blob URL
     */
    private getPdfUrl(ticket: string): Observable<string | null> {
        return this.http.get(`${this.baseUrl}/pdf/${ticket}`, {
            responseType: 'blob'
        }).pipe(
            map(blob => {
                return URL.createObjectURL(blob);
            }),
            catchError(error => {
                console.error('Error fetching PDF:', error);
                return of(null);
            })
        );
    }

    /**
     * Fetch XML document content as text
     */
    private getXmlContent(ticket: string): Observable<string | null> {
        return this.http.get(`${this.baseUrl}/xml/${ticket}`, {
            responseType: 'text'
        }).pipe(
            catchError(error => {
                console.error('Error fetching XML:', error);
                return of(null);
            })
        );
    }

    /**
     * Fetch CDR document content as text
     */
    private getCdrContent(ticket: string): Observable<string | null> {
        return this.http.get(`${this.baseUrl}/cdr/${ticket}`, {
            responseType: 'text'
        }).pipe(
            catchError(error => {
                console.error('Error fetching CDR:', error);
                return of(null);
            })
        );
    }

    /**
     * Download file by creating temporary anchor element
     */
    downloadFile(url: string, filename: string): void {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    /**
     * Download text content as file
     */
    downloadTextAsFile(content: string, filename: string): void {
        const blob = new Blob([content], { type: 'text/xml' });
        const url = URL.createObjectURL(blob);
        this.downloadFile(url, filename);
        URL.revokeObjectURL(url);
    }
}
