import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes),
        title: 'Autenticación - EFACT'
    },
    {
        path: 'documentos',
        canActivate: [authGuard],
        loadChildren: () => import('./features/documents/documents.routes').then(m => m.documentRoutes),
        title: 'Documentos - EFACT'
    },
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    {
        path: '404',
        component: NotFoundComponent,
        title: '404 - Página No Encontrada'
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: '404 - Página No Encontrada'
    }
];
