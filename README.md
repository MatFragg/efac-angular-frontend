# EFACT - Visor de Documentos Electrónicos

Aplicación web desarrollada en Angular 19 para la visualización y gestión de documentos de facturación electrónica (PDF, XML, CDR).

---

## 1. Introducción al Proyecto

### 1.1 Descripción General

EFACT es una aplicación frontend moderna construida con Angular 19 que permite a los usuarios autenticarse y visualizar documentos de facturación electrónica mediante un sistema de búsqueda por número de ticket. La aplicación proporciona una experiencia de usuario fluida para visualizar PDFs, archivos XML firmados y archivos CDR (Constancia de Recepción) con syntax highlighting profesional.

### 1.2 Información del Desarrollador

**Nombre:** Ethan Matías Aliaga Aguirre  
**Rol:** Full-Stack / Front-end Developer Intern   
**Experiencia:** Desarrollo de aplicaciones web, bases de datos y arquitecturas orientadas a buenas prácticas.  

**Especialidades:**  
- Desarrollo web con Angular, Vue, Express.js.
- Desarrollo mobile con Flutter y Jetpack Compose.
- Desarrollo backend con ASP.NET Core, Springboot y Node.js.
- Diseño e implementación de arquitecturas modulares (DDD, MVC, Clean Architecture).  
- Bases de datos SQL y NoSQL (MySQL, PostgreSQL, SQL Server, MongoDB).  
- Integración de autenticación segura, envío de correos, geolocalización e interfaces modernas con Tailwind y Bootstrap.  
- Optimización de experiencia de usuario y desarrollo de sistemas escalables.

**Contacto:**  
- **Email:** ethan.aliaga@gmail.com  
- **LinkedIn:** https://www.linkedin.com/in/matias-aliaga-aguirre-5332b020a  
- **GitHub:** https://github.com/MatFragg  

**Resumen breve:**  
Estudiante de Ingeniería de Software con sólida experiencia en desarrollo web full-stack, diseño de bases de datos y construcción de sistemas robustos orientados a servicios. He desarrollado plataformas completas como ElectroLink, Meeti, InmoLinking y Mentorly, aplicando principios de Domain-Driven Design, buenas prácticas de arquitectura y un enfoque en optimización de flujo, rendimiento y experiencia de usuario. Me especializo en crear soluciones escalables, limpias y organizadas, aplicando patrones como DI, MVC y servicios reutilizables.


### 1.3 Problemática

La prueba técnica requería implementar un sistema frontend para:

- **Autenticación**: Login mediante OAuth 2.0 (grant type password) con almacenamiento seguro de tokens
- **Búsqueda de Documentos**: Interfaz para buscar documentos mediante número de ticket
- **Visualización Multi-formato**: 
  - PDF: Visualización en iframe
  - XML: Código fuente con syntax highlighting y acciones (copiar/descargar)
  - CDR: Código fuente con syntax highlighting y acciones (copiar/descargar)
- **UX/UI Profesional**: Interfaz alineada con diseño Figma proporcionado
- **Routing Avanzado**: URLs compartibles con ticket ID incluido
- **Manejo de Errores**: Página 404 personalizada y manejo global de errores HTTP

**Objetivos Específicos:**
- Clean Architecture y separación de responsabilidades
- Componentes reutilizables (Smart/Presentational pattern)
- Gestión de estado reactiva con Signals
- Seguridad mediante Guards e Interceptors
- Código mantenible y escalable

---

## 2. Stack Tecnológico (Bibliotecas y Frameworks)

### 2.1 Core Framework

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Angular** | 19.2.0 | Framework principal SPA |
| **TypeScript** | 5.7.2 | Lenguaje de programación tipado |
| **RxJS** | 7.8.0 | Programación reactiva y manejo de async |
| **Zone.js** | 0.15.0 | Change detection de Angular |

### 2.2 UI/UX Libraries

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Angular Material** | 19.2.19 | Componentes UI (buttons, forms, icons, tabs) |
| **Angular CDK** | 19.2.19 | Utilidades y comportamientos UI |
| **highlight.js** | 11.11.1 | Motor de syntax highlighting |
| **ngx-highlightjs** | 14.0.1 | Wrapper Angular para highlight.js |

### 2.3 Development Tools

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Angular CLI** | 19.2.7 | Build tool y desarrollo |
| **Karma + Jasmine** | 6.4.0 / 5.6.0 | Testing framework |
| **TypeScript Compiler** | 5.7.2 | Compilación y type checking |

### 2.4 Características Clave de Angular 19

- **Standalone Components**: Eliminación de NgModules para simplicidad
- **Signals**: Gestión de estado reactiva sin RxJS para datos síncronos
- **Functional Guards**: Guards modernos usando funciones en lugar de clases
- **HTTP Interceptors Funcionales**: Interceptors modernos basados en funciones
- **Control Flow Syntax**: `@if`, `@for`, `@switch` en templates
- **Lazy Loading**: Carga diferida de módulos mediante routes

---

## 3. Arquitectura Implementada

### 3.1 Estructura General

La aplicación sigue una **arquitectura feature-based** con separación clara de responsabilidades:

```
src/app/
├── core/              # Servicios singleton, guards, interceptors
│   ├── guards/        # Protección de rutas (authGuard)
│   ├── interceptors/  # HTTP interceptors (auth, error)
│   ├── services/      # Servicios globales (AuthService, TokenService)
│   └── models/        # Interfaces y tipos compartidos
│
├── features/          # Módulos de funcionalidades
│   ├── auth/         # Feature de autenticación
│   │   ├── components/      # Login (Smart Component)
│   │   │   └── ui/          # LoginForm (Presentational)
│   │   └── auth.routes.ts
│   │
│   └── documents/    # Feature de documentos
│       ├── components/
│       │   ├── documents-landing/  # Smart Component
│       │   └── ui/                 # Presentational Components
│       │       ├── pdf-viewer/
│       │       ├── xml-viewer/
│       │       ├── cdr-viewer/
│       │       └── code-viewer/    # Reutilizable para XML/CDR
│       ├── services/     # DocumentService
│       ├── models/       # DocumentData interfaces
│       └── documents.routes.ts
│
└── shared/           # Componentes, pipes, utilidades reutilizables
    ├── components/   # Header, NotFound, Spinners, ErrorMessage
    └── pipes/        # SafeUrlPipe (para iframes)
```

### 3.2 Patrones Arquitectónicos

#### **Smart/Presentational Components**

**Smart Components (Containers)**:
- Ubicación: `features/{feature}/components/`
- Responsabilidades:
  - Inyectar servicios
  - Gestionar estado con Signals
  - Manejar lógica de negocio
  - Orquestar llamadas HTTP
- Ejemplo: `DocumentsLandingComponent`

**Presentational Components (UI)**:
- Ubicación: `features/{feature}/components/ui/`
- Responsabilidades:
  - Recibir datos vía `@Input()`
  - Emitir eventos vía `@Output()`
  - Sin inyección de servicios
  - 100% reutilizables
- Ejemplo: `CodeViewerComponent`, `PdfViewerComponent`

#### **Dependency Injection**

```typescript
// Todos los servicios son singleton
@Injectable({ providedIn: 'root' })
export class AuthService { }

// Inyección mediante inject()
private authService = inject(AuthService);
```

#### **Reactive State Management**

Estrategia híbrida:
- **Signals** para estado síncrono local de componentes
- **RxJS Observables** para operaciones asíncronas (HTTP)

```typescript
// Signals para estado
documentData = signal<DocumentData | null>(null);
isLoading = signal(false);

// RxJS para HTTP
this.documentService.getDocuments(ticket)
  .subscribe(data => this.documentData.set(data));
```

### 3.3 Flujo de Datos

#### **Autenticación**
```
Usuario → LoginComponent → AuthService → HTTP (OAuth) → TokenService → Signal Update → Route Guard → Navegación
```

#### **Visualización de Documentos**
```
URL Params → DocumentsLanding → DocumentService → Auth Interceptor → API → Signal Update → Presentational Components
```

---

## 4. Funcionalidades Implementadas

### 4.1 Autenticación y Seguridad

#### Sistema de Login
- Formulário reactivo con validaciones
- OAuth 2.0 Password Grant
- Almacenamiento seguro de tokens (sessionStorage)
- Feedback visual (loading, errors)
- Redirección post-login con `returnUrl`

#### Protección de Rutas
- **AuthGuard**: Bloquea acceso a `/documentos` sin autenticación
- Redirección automática a `/auth/login`
- Preservación de URL destino

#### HTTP Interceptors
- **AuthInterceptor**: Agrega token Bearer automáticamente
- **ErrorInterceptor**: Manejo global de errores (401, 403, 404, 500)
- Notificaciones de usuario automáticas

### 4.2 Gestión de Documentos

#### Búsqueda Unificada
- Interfaz tipo "Google Search"
- Campo de ticket con validación
- Resultados inline sin navegación
- URL dinámica: `/documentos/{ticketId}`

#### Visualización Multi-formato

**PDF Viewer:**
- Renderizado en iframe seguro
- SafeUrlPipe para sanitización
- Botón de descarga

**XML Viewer:**
- Syntax highlighting (GitHub theme)
- Líneas numeradas
- Botón copiar al portapapeles
- Botón descargar archivo
- Scroll horizontal/vertical

**CDR Viewer:**
- Mismas características que XML
- Reutiliza CodeViewerComponent
- Formato específico para CDR

#### CodeViewerComponent Reutilizable
**Características:**
- Toolbar con nombre de archivo y contador de líneas
- Botones de acción (copiar, descargar)
- Syntax highlighting con highlight.js
- Tema GitHub (light) para usuarios de negocio
- Fallback para copiar (navigator.clipboard + execCommand)
- Fuente monospace (Fira Code)
- Scrollbar personalizado

### 4.3 Navegación y Routing

#### Header Component
- Navegación global con logo EFACT
- 7 ítems del menú (Crear, Enviados, Recibidos, etc.)
- Sección de ayuda
- Avatar de usuario
- Sticky positioning
- Diseño alineado con Figma

#### 404 Not Found Page
- Diseño profesional con icono de error
- Código 404 destacado
- Mensaje en español
- Botones de acción:
  - "Ir a Inicio" → `/documentos`
  - "Volver" → `window.history.back()`
- Incluye header para consistencia

#### URL Routing Avanzado
- Rutas definidas:
  - `/auth/login` - Login
  - `/documentos` - Landing sin ticket
  - `/documentos/:ticket` - Con resultados
  - `/404` - Página de error
  - `**` - Wildcard → 404
- URLs compartibles
- Integración con historial del navegador

### 4.4 UX/UI Features

#### Design System
- **Colores**:
  - Primario (Rojo): `#dc2626` (EFACT brand)
  - Éxito (Verde): `#16a34a` (botón XML)
  - Info (Azul): `#2563eb` (botón CDR, iconos)
  - Fondo: `#f5f7fa` (limpio, profesional)
- **Tipografía**: Inter (Google Fonts) con pesos 400-700
- **Espaciado**: Sistema consistente de 8px baseline
- **Border Radius**: 8-12px para modernidad
- **Sombras**: Sutiles (0 2px 8px rgba(0,0,0,0.08))

#### Estados y Feedback
- Loading spinners durante fetch
- Error messages con Material Snackbar
- Estados vacíos (sin documentos)
- Validaciones de formulario en tiempo real
- Tooltips en botones de acción

#### Responsive Design
- Breakpoint móvil: 768px
- Header adaptativo (menú colapsable en móvil)
- Cards flexibles
- Botones apilados en mobile

---

## 5. Buenas Prácticas Aplicadas

### 5.1 Código Limpio (Clean Code)

#### Single Responsibility Principle
- Cada componente tiene una única responsabilidad
- Servicios enfocados (AuthService, TokenService, DocumentService)
- Separación de concerns (presentación vs lógica)

#### DRY (Don't Repeat Yourself)
- `CodeViewerComponent` reutilizable para XML y CDR
- `SafeUrlPipe` compartido
- Componentes shared (Header, ErrorMessage, LoadingSpinner)

#### Convenções de Nomenclatura
- Archivos: `kebab-case.type.ts`
- Clases: `PascalCase`
- Variables/funciones: `camelCase`
- Constantes: `UPPER_SNAKE_CASE`
- Prefijos consistentes (`app-` para selectores)

### 5.2 Patrones de Diseño

#### Dependency Injection
- Loose coupling entre componentes y servicios
- Testability mejorada
- Singleton services automáticos

#### Observer Pattern
- RxJS Observables para async operations
- Subscripciones y unsubscripciones apropiadas
- Uso de `pipe()` para transformaciones

#### Strategy Pattern
- Interceptors para estrategias de manejo HTTP
- Guards para estrategias de protección de rutas

#### Facade Pattern
- Services como fachadas de la lógica de negocio
- Ocultación de complejidad HTTP

### 5.3 Seguridad

#### Token Management
- Almacenamiento en sessionStorage (no localStorage)
- Expiración de tokens validada
- Limpieza en logout

#### XSS Prevention
- SafeUrlPipe para sanitización de URLs
- Angular's built-in sanitization
- No uso de `innerHTML` sin sanitizar

#### CORS Handling
- Proxy configuration en `proxy.conf.json`
- Endpoint `/api` proxiado a backend

#### Error Handling
- Try/catch en operaciones críticas
- Fallbacks para APIs no soportadas (clipboard)
- Manejo global de errores HTTP

### 5.4 Performance

#### Lazy Loading
- Features cargados bajo demanda
- `loadChildren()` en routes

#### Change Detection Optimization
- Signals para actualizaciones granulares
- OnPush strategy implícita con standalone

#### Bundle Optimization
- Import específicos de Material
- Highlight.js cargado solo cuando necesario

### 5.5 Mantenibilidad

#### Type Safety
- Interfaces para todos los modelos
- Strict TypeScript configuration
- Typed RxJS operators

#### Modularidad
- Feature-based organization
- Standalone components
- Clear boundaries entre features

#### Documentación
- JSDoc en servicios críticos
- Comentarios explicativos en lógica compleja
- README detallado (este documento)

### 5.6 Testing (Preparado)

#### Estructura de Tests
- Archivos `*.spec.ts` junto a componentes
- Karma + Jasmine configurado
- Preparado para unit tests

#### Testability
- Dependency Injection facilita mocking
- Smart/Presentational split mejora testing
- Servicios desacoplados

---

## 6. Instalación y Uso

### 6.1 Prerequisitos

```bash
Node.js >= 18.x
npm >= 9.x
```

### 6.2 Instalación

```bash
# Clonar repositorio
git clone [REPO_URL]

# Instalar dependencias
cd efac-angular-frontend
npm install
```

### 6.3 Configuración

**Archivo:** `src/environments/environment.development.ts`

```typescript
export const environment = {
    production: false,
    apiUrl: '/api',  // Proxied a backend
    oauth: {
        tokenEndpoint: '/oauth/token',
        clientCredentials: 'Y2xpZW50OnNlY3JldA==',  // Base64
    }
};
```

**Proxy Configuration:** `proxy.conf.json`

```json
{
  "/api": {
    "target": "https://odin-dev.efact.pe/api-efact-ose",
    "secure": false,
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    }
  }
}
```

### 6.4 Ejecutar Aplicación

```bash
# Desarrollo
npm start
# O alternativamente
ng serve

# Navega a: http://localhost:4200/
```

### 6.5 Build Producción

```bash
npm run build
# Artifacts en: dist/
```

---

## 7. Estructura de Rutas

| Ruta | Componente | Descripción | Guard |
|------|-----------|-------------|-------|
| `/auth/login` | LoginComponent | Página de login | - |
| `/documentos` | DocumentsLandingComponent | Búsqueda de tickets | authGuard |
| `/documentos/:ticket` | DocumentsLandingComponent | Vista con documentos | authGuard |
| `/404` | NotFoundComponent | Página de error | - |
| `**` | NotFoundComponent | Wildcard catch-all | - |

---

## 8. Endpoints API Utilizados

### Autenticación
```http
POST /oauth/token
Content-Type: application/x-www-form-urlencoded
Authorization: Basic [clientCredentials]

grant_type=password&username={user}&password={pass}
```

### Documentos
```http
GET /documentoSunat/{ticket}
Authorization: Bearer {token}
```

### Descargas
```http
GET /documentoSunat/{ticket}/{type}
Authorization: Bearer {token}
```

---

## 9. Mejoras Futuras

### Corto Plazo
- [ ] Implementar tests unitarios completos
- [ ] Agregar refresh token automático
- [ ] Dark mode toggle
- [ ] Búsqueda con filtros avanzados

### Mediano Plazo
- [ ] Implementar páginas del header (`/crear`, `/enviados`, etc.)
- [ ] Historial de búsquedas
- [ ] Pretty-print XML con formateo
- [ ] Búsqueda dentro del código (Ctrl+F)

### Largo Plazo
- [ ] PWA con offline support
- [ ] i18n (internacionalización)
- [ ] Analytics integration
- [ ] E2E tests con Cypress

---

## 10. Comandos Útiles

```bash
# Generar componente
ng generate component features/documents/components/ui/new-component

# Generar servicio
ng generate service core/services/new-service

# Ejecutar tests
ng test

# Build con análisis de bundle
ng build --stats-json
npx webpack-bundle-analyzer dist/stats.json

# Linting
ng lint
```

---

## 11. Recursos y Referencias

- [Angular Official Docs](https://angular.dev/)
- [Angular Material](https://material.angular.io/)
- [RxJS Documentation](https://rxjs.dev/)
- [highlight.js](https://highlightjs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 12. Licencia

Este proyecto es parte de una evaluación técnica para EFACT.

---

## 13. Contacto

**Desarrollador:** Ethan Matias Aliaga Aguirre  
**Email:** ethan.aliaga@gmail.com  
**LinkedIn:** https://www.linkedin.com/in/matias-aliaga-aguirre-5332b020a/  
**GitHub:** https://github.com/MatFragg

---

**Desarrollado con ❤️ usando Angular 19**
