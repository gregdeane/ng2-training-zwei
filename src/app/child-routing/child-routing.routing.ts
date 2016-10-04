import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChildRoutingComponent } from './child-routing.component';
import { ChildRoutingDetailComponent } from './child-routing-detail.component';
import { ChildRoutingListComponent } from './child-routing-list.component';

const childRoutingRoutes: Routes = [
  {
    path: 'persons',
    component: ChildRoutingComponent,
    children: [
      {
        path: ':id',
        component: ChildRoutingDetailComponent
      },
      {
        path: '',
        component: ChildRoutingListComponent
      }
    ]
  }
];

export const childRoutingRouting: ModuleWithProviders = RouterModule.forChild(childRoutingRoutes);
