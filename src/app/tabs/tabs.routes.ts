import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'profile',
        loadComponent: () =>
          import('./profiletab/profiletab.page').then((m) => m.ProfilePage),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('./chattab/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
];
