import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'empleados',
    loadComponent: () => import('./empleados/layout/layout.component'),
    children: [
      {
        path: 'nuevo',
        title: 'Nuevo Empleado',
        loadComponent: () => import('./empleados/pages/nuevo-empleado/nuevo-empleado.component')
      },
      {
        path: 'lista',
        title: 'Lista de Empleados',
        loadComponent: () => import('./empleados/pages/empleado-lista/empleado-lista.component')
      },
      {
        path: ':id',
        title: 'Detalles Empleado',
        loadComponent: () => import('./empleados/pages/empleado-detalles/empleado-detalles.component')
      },
      {
        path: 'editar/:id',
        title: 'Editar Empleado',
        loadComponent: () => import('./empleados/pages/nuevo-empleado/nuevo-empleado.component')
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
