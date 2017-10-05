import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductosComponent } from './productos/productos.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { NuevoEcommerceComponent } from "./ecommerce/nuevoEcommerce/nuevo-ecommerce.component";
import { ListaEcommerceComponent } from "./ecommerce/listaEcommerce/lista-ecommerce.component";
import { ImportarProductosComponent } from "./ecommerce/importarProductos/importar-productos.component";
import { ListaProductosComponent } from "./productos/listaProductos/lista-productos.component";
import { CatalogoRoutes } from './catalogo.routing';

import { ToolModule } from '../tools/tools.module';
// import { PruebaComponent } from './prueba/prueba.component';

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(CatalogoRoutes),
      FormsModule,
      ToolModule.forRoot()
    ],
    declarations: [
        ProductosComponent,
        EcommerceComponent,
        NuevoEcommerceComponent,
        ImportarProductosComponent,
        ListaEcommerceComponent,
        ListaProductosComponent
    ]
  })
  
  export class CatalogoModule {}