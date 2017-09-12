import { Routes } from '@angular/router';

import { ProductosComponent } from './productos/productos.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';

export const CatalogoRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'productos',
        component: ProductosComponent
    }]},
    {
        path: '',
        children: [ {
         path: 'ecommerce',
        component: EcommerceComponent
    }]}
];