# Catálogo de Productos

Aplicación web interactiva desarrollada con **Angular 21** que permite visualizar, explorar y gestionar una lista de productos consumiendo la API pública de [DummyJSON](https://dummyjson.com/products).

## Stack Tecnológico

| Capa | Tecnología | Justificación |
|------|-----------|---------------|
| Framework | Angular 21 | Última versión estable, standalone components |
| Lenguaje | TypeScript | Tipado estricto, mejor DX |
| Estado | Signals | API reactiva nativa de Angular |
| Async | RxJS | Manejo de streams HTTP y eventos |
| HTTP | HttpClient + Interceptors | Manejo centralizado de peticiones y errores |
| Estilos | SCSS + Tailwind CSS 4 | Utilidades rápidas + estilos personalizados |
| Tests | Vitest (Angular CLI) | Runner moderno integrado con Angular 21 |
| Build | Vite (via Angular CLI) | Compilación rápida |

## Requisitos previos

- Node.js >= 20.x
- npm >= 10.x
- Angular CLI >= 21.x

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/sahernandezz/dummyjson-products.git
cd dummyjson-products

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
ng serve
```

La aplicación estará disponible en `http://localhost:4200`.

## Scripts disponibles

```bash
ng serve              # Servidor de desarrollo
ng build              # Build de producción
ng test               # Ejecutar tests unitarios
ng test --watch       # Tests en modo watch
```

## Docker

El proyecto incluye un `Dockerfile` multi-stage (Node para build, nginx para servir) y un `docker-compose.yml` listo para usar.

```bash
# Construir y levantar
docker compose up --build

# En segundo plano
docker compose up -d --build

# Ver logs
docker compose logs -f

# Detener
docker compose down
```

La aplicación quedará disponible en `http://localhost:8080`.

El contenedor de producción:
- Sirve los archivos compilados con **nginx alpine** (~50MB final)
- Incluye **gzip** y **cache-control** agresivo para assets con hash
- SPA fallback para que las rutas de Angular Router funcionen
- Headers de seguridad: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`
- Healthcheck cada 30s

## Estructura del proyecto

```
src/app/
├── core/                        # Servicios singleton, interceptors, modelos
│   ├── interceptors/
│   │   └── error.interceptor.ts # Manejo global de errores HTTP
│   ├── models/
│   │   ├── product.model.ts     # Interfaces de Product, Review, Dimensions
│   │   ├── cart.model.ts        # Interface CartItem
│   │   └── api-response.model.ts
│   └── services/
│       ├── product.service.ts   # Llamadas a la API con paginación y cache
│       ├── cart.service.ts      # Estado del carrito con Signals
│       └── notification.service.ts
│
├── shared/                       # Componentes reutilizables
│   ├── components/
│   │   ├── header/               # Header con búsqueda y badge del carrito
│   │   ├── footer/               # Footer minimalista con atribución
│   │   ├── scroll-top/           # Botón flotante para volver arriba
│   │   ├── image-carousel/       # Carrusel de imágenes con dots
│   │   ├── star-rating/          # Estrellas de calificación
│   │   ├── loading-skeleton/     # Placeholders animados (shimmer)
│   │   ├── empty-state/          # Estado vacío
│   │   └── toast/                # Notificaciones toast
│   ├── pipes/
│   │   └── currency-cop.pipe.ts  # Conversión USD → COP
│   └── directives/
│       └── lazy-image.directive.ts # Lazy loading con IntersectionObserver
│
└── features/                     # Módulos de negocio (lazy loaded)
    ├── catalog/                  # Listado de productos
    │   └── components/
    │       ├── product-card/     # Tarjeta de producto
    │       ├── sort-controls/    # Controles de ordenamiento
    │       └── filter-bar/       # Filtro por categorías
    ├── product-detail/           # Vista de detalle
    │   └── components/
    │       ├── product-info/     # Información principal + CTA
    │       ├── product-reviews/  # Reseñas de usuarios
    │       ├── product-dimensions/
    │       ├── detail-skeleton/  # Skeleton específico del detalle
    │       └── related-products/ # Carrusel de productos relacionados
    └── cart/                     # Carrito de compras (sidebar)
        └── components/
            ├── cart-item/        # Item individual
            └── cart-summary/     # Resumen y total
```

## Decisiones de arquitectura

### Standalone Components
Todos los componentes son standalone, eliminando la necesidad de NgModules y mejorando el tree-shaking.

### Signals para estado del carrito
Se usa la API de Signals de Angular para el estado reactivo del carrito, lo que ofrece:
- Menos boilerplate que NgRx/RxJS para estado local
- Change detection granular automático
- Computed values derivados (totalItems, totalPrice)
- `effect()` sincroniza automáticamente cambios con localStorage

### Persistencia del carrito
El carrito se persiste en `localStorage` (key versionada `cart_v1`) usando un `effect()` de Angular que reacciona a cualquier cambio del signal. Sobrevive a refresh y reinicios del navegador. Implementación tolerante a errores (SSR, modo privado, JSON corrupto, quota excedida).

### Lazy Loading de rutas
Cada feature (catalog, product-detail) se carga bajo demanda, reduciendo el bundle inicial.

### OnPush Change Detection
Los componentes de presentación usan `ChangeDetectionStrategy.OnPush` para minimizar ciclos de detección de cambios innecesarios.

### Infinite Scroll
Se implementó scroll infinito nativo con `@HostListener('window:scroll')` cargando 20 productos por batch, en lugar de cargar los 194 productos de una vez.

### Caché de categorías
El servicio de productos cachea la lista de categorías usando `shareReplay(1)` de RxJS para evitar llamadas repetidas a la API.

## Optimizaciones de rendimiento

- **Lazy loading de rutas**: cada feature se carga solo cuando se navega a ella
- **Lazy loading de imágenes**: directiva personalizada con `IntersectionObserver`
- **OnPush Change Detection**: componentes de presentación optimizados
- **Infinite scroll**: paginación progresiva de 20 en 20 productos
- **trackBy en listas**: evita re-renders innecesarios del DOM
- **Caché de API**: categorías cacheadas con `shareReplay`
- **View Transitions**: transiciones suaves entre vistas con la API nativa
- **Persistencia del carrito**: estado del carrito guardado en localStorage para no perderlo al refrescar

## Consideraciones de seguridad

- **Sanitización de URLs**: la directiva `LazyImageDirective` valida que las URLs de imágenes usen protocolos seguros (http/https) antes de cargarlas
- **HttpInterceptor**: interceptor global que captura errores HTTP y muestra mensajes al usuario sin exponer detalles técnicos
- **No uso de innerHTML**: se evita `innerHTML` sin sanitizar en toda la aplicación
- **Validación de datos del backend**: los modelos TypeScript tipan estrictamente las respuestas de la API
- **CSP (Content Security Policy)**: se recomienda configurar headers CSP en el servidor de producción para prevenir XSS

## Tests

```bash
# Ejecutar todos los tests
ng test

# Tests en modo watch
ng test --watch
```

### Cobertura de tests

Se incluyen tests unitarios para:

- **Servicios**: `CartService` (18 tests, incluye 5 de persistencia), `ProductService` (6 tests), `NotificationService` (7 tests)
- **Pipes**: `CurrencyCopPipe` (7 tests)
- **Componentes**: `ProductCardComponent` (6 tests), `SortControlsComponent` (4 tests), `App` (4 tests), `FooterComponent` (5 tests), `ScrollTopComponent` (5 tests)

Total: **63 tests** cubriendo la lógica de negocio principal, persistencia en localStorage, llamadas HTTP con mocks, y renderizado de componentes.

## API consumida

La aplicación consume la API pública de [DummyJSON](https://dummyjson.com/docs/products):

| Endpoint | Descripción |
|----------|-------------|
| `GET /products?limit=20&skip=0` | Listado paginado |
| `GET /products/{id}` | Detalle de producto |
| `GET /products/category-list` | Lista de categorías |
| `GET /products/category/{slug}` | Filtrar por categoría |
| `GET /products/search?q=...` | Búsqueda por texto |

## Branching (Gitflow) y versionamiento

El proyecto sigue el flujo Gitflow con versionado semántico:

- `main` — releases estables (cada uno con su tag anotado)
- `develop` — integración de features
- `feature/*` — ramas por funcionalidad (eliminadas tras merge)
- `release/*` — preparación de releases (eliminadas tras tag)
- `hotfix/*` — correcciones urgentes en producción

### Releases

| Versión | Descripción |
|---------|-------------|
| `v1.0.0` | Catálogo inicial completo con todas las funcionalidades base |
| `v1.0.1` | Hotfix: corrección del carrusel que no cambiaba de imagen |
| `v1.1.0` | UI/UX redesign: design tokens, animaciones, mejor tipografía |
| `v1.2.0` | UI polish: footer, back-to-top, breadcrumb mejorado, precio original |
| `v1.3.0` | UX improvements: cards uniformes, breadcrumb funcional, detalle rediseñado, productos relacionados |
| `v1.4.0` | Card click fix, CTA negro, meta info, Docker + nginx setup |
| `v1.4.1` | Hotfix: Docker build (nginx.conf en context + npm install para deps platform-specific) |
| `v1.5.0` | Carrito persistente en localStorage con `effect()`, sobrevive refresh |
