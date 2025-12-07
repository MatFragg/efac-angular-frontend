import { Routes } from '@angular/router';
import { DocumentsLandingComponent } from './components/documents-landing/documents-landing.component';

export const documentRoutes: Routes = [
    {
        path: '',
        component: DocumentsLandingComponent,
        title: 'Visor de Documentos Electrónicos - EFACT'
    },
    {
        path: ':ticket',
        component: DocumentsLandingComponent,
        title: 'Visor de Documentos Electrónicos - EFACT'
    }
];
