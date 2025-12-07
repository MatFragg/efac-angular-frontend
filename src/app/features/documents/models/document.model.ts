/**
 * Document viewer domain models
 * @author Matias Aliaga
 */

export type DocumentType = 'pdf' | 'xml' | 'cdr';

export interface DocumentUrls {
    pdfUrl: string | null;
    xmlContent: string | null;
    cdrContent: string | null;
}

export interface DocumentMetadata {
    ticket: string;
    fileName?: string;
    createdDate?: Date;
}

export interface DocumentData {
    urls: DocumentUrls;
    metadata: DocumentMetadata;
}
