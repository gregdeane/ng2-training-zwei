import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { ManageCitiesComponent } from './manage-cities.component';
import { ManagePersonsComponent } from './manage-persons.component';

import { adminRouting } from './admin.routing';

import { AuthGuard } from '../auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    adminRouting
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ManageCitiesComponent,
    ManagePersonsComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class AdminModule {}
