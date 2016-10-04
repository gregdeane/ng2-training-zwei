import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { ManageCitiesComponent } from './manage-cities.component';
import { ManagePersonsComponent } from './manage-persons.component';

import { AuthGuard } from '../auth-guard.service';

// Note that in the child route under `AdminComponent`, there is a route with `path` and `children`
// properties but there is no component. We want to group our management routes under the `admin`
// path but we don't need a component just to group those routes under and additional `RouterOutlet`.
// This also allows us to guard child routes.
const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'persons', component: ManagePersonsComponent },
          { path: 'cities', component: ManageCitiesComponent },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }
];

export const adminRouting: ModuleWithProviders = RouterModule.forChild(adminRoutes);
