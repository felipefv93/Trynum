import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AuthGuard} from './services/auth.guard';

export const AppRoutes: Routes = [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '',
      component: AdminLayoutComponent,
      canActivate: [AuthGuard],
      children: [
          {
            path: '',
            loadChildren: './dashboard/dashboard.module#DashboardModule'
          },
          {
            path: 'inicial',
            loadChildren: './inicial/inicial.module#InicialModule'
          },
          {
            path: 'catalogo',
            loadChildren: './catalogo/catalogo.module#CatalogoModule'
            // canActivateChild:[AuthGuard]
          }
  ]
    },
    {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
      }]
    }
];
