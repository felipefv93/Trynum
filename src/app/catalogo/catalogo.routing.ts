import { Routes } from '@angular/router';

import { ProductosComponent } from './productos/productos.component';
import { EcommerceExternoComponent } from './ecommerce/ecommerce-externo.component';

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
         path: 'ecommerceExterno',
        component: EcommerceExternoComponent
    }]}
];