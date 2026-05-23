import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/catalog/catalog.routes').then(m => m.CATALOG_ROUTES)
  },
  {
    path: 'product/:id',
    loadChildren: () =>
      import('./features/product-detail/product-detail.routes').then(m => m.PRODUCT_DETAIL_ROUTES)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
