import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonComponent } from './person.component';
import { PersonDetailComponent } from './person-detail.component';
import { PersonListComponent } from './person-list.component';

const personRoutes: Routes = [
  {
    path: 'persons',
    component: PersonComponent,
    children: [
      {
        path: ':id',
        component: PersonDetailComponent
      },
      {
        path: '',
        component: PersonListComponent
      }
    ]
  }
];

export const personRouting: ModuleWithProviders = RouterModule.forChild(personRoutes);
