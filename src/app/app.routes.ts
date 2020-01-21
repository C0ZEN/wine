import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '**',
    redirectTo: 'page-not-found'
  }
];
