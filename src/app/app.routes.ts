import { Routes } from "@angular/router";
import { LoginGuard } from './core/guards/login.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
          import('./modules/login/login.page').then((m) => m.LoginPage),
      },
      {
        path: 'tasks',
        canActivate: [LoginGuard],
        loadComponent: () =>
          import('./modules/tasks/tasks.page').then((m) => m.TasksPage),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'login',
      },
];
