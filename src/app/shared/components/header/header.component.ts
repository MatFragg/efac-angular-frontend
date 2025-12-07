import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

/**
 * Header navigation component matching Figma design
 * Contains navigation menu, help link, and user icon
 * @author Matias Aliaga
 */
@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        RouterModule
    ],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    navigationItems = [
        { label: 'Documentos', route: '/documentos' },
        { label: 'Crear Comprobante', route: '/crear' },
        { label: 'Comprobantes Enviados', route: '/enviados' },
        { label: 'Comprobantes Recibidos', route: '/recibidos' },
        { label: 'Reportes', route: '/reportes' },
        { label: 'Items', route: '/items' },
        { label: 'Cobranzas', route: '/cobranzas' }
    ];
}
