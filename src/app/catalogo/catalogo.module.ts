import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { ProductosComponent } from './productos/productos.component';
import { EcommerceExternoComponent } from './ecommerce/ecommerce-externo.component';
import { NuevoEcommerceComponent } from "./ecommerce/nuevoEcommerce/nuevo-ecommerce.component";
import { ListaEcommerceComponent } from "./ecommerce/listaEcommerce/lista-ecommerce.component";
import { ImportarProductosComponent } from "./ecommerce/importarProductos/importar-productos.component";
import { ListaProductosComponent } from "./productos/listaProductos/lista-productos.component";
import { ProductoComponent } from "./productos/producto/producto.component";
import { CatalogoRoutes } from './catalogo.routing';

import { ToolModule } from '../tools/tools.module';
// import { PruebaComponent } from './prueba/prueba.component';

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(CatalogoRoutes),
      FormsModule,
      FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
      ToolModule.forRoot()
    ],
    declarations: [
        ProductosComponent,
        EcommerceExternoComponent,
        NuevoEcommerceComponent,
        ImportarProductosComponent,
        ListaEcommerceComponent,
        ListaProductosComponent,
        ProductoComponent
    ]
  })
  
  export class CatalogoModule {}