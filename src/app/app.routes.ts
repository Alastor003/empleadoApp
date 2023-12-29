import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'empleados',
    loadComponent: () => import('./features/empleado/layout/layout.component'),
    children: [
      {
        path: 'nuevo',
        title: 'Nuevo Empleado',
        loadComponent: () => import('./features/empleado/pages/nuevo-empleado/nuevo-empleado.component')
      },
      {
        path: 'lista',
        title: 'Lista de Empleados',
        loadComponent: () => import('./features/empleado/pages/empleado-lista/empleado-lista.component')
      },
      {
        path: ':id',
        title: 'Detalles Empleado',
        loadComponent: () => import('./features/empleado/pages/empleado-detalles/empleado-detalles.component')
      },
      {
        path: 'editar/:id',
        title: 'Editar Empleado',
        loadComponent: () => import('./features/empleado/pages/nuevo-empleado/nuevo-empleado.component')
      },
      {
        path: '', redirectTo: 'lista', pathMatch: 'full',
      }
    ]
  },
  {
    path: '',
    redirectTo: '/empleados',
    pathMatch: 'full'
  }

];
