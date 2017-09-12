import { Routes } from '@angular/router';

import { InicialComponent } from './inicial.component';

export const InicialRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: InicialComponent
    }]
}
];
