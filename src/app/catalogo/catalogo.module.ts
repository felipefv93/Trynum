import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductosComponent } from './productos/productos.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
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
        EcommerceComponent
    ]
  })
  
  export class CatalogoModule {}