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
            loadChildren: './dashboard/dashboard.module#DashboardModule',
            canActivateChild:[AuthGuard]
          },
          {
            path: 'inicial',
            loadChildren: './inicial/inicial.module#InicialModule',
            canActivateChild:[AuthGuard]
          },
          {
            path: 'catalogo',
            loadChildren: './catalogo/catalogo.module#CatalogoModule',
            canActivateChild:[AuthGuard]
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
