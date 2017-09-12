import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { LbdTableComponent } from '../lbd/lbd-table/lbd-table.component';

import { InicialComponent } from './inicial.component';
import { InicialRoutes } from './inicial.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(InicialRoutes),
        FormsModule
    ],
    declarations: [InicialComponent]
})

export class InicialModule {}
