import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { HomeComponent } from './home';
// import { PageNotFoundComponent } from './404';

import { loginRoutes, authProviders } from './login/login.routing';

import { CanDeactivateGuard } from './can-deactivate-guard.service';

// const appRoutes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'home', component: HomeComponent },
//   { path: '**', component: PageNotFoundComponent }
// ];
const appRoutes: Routes = [
  ...loginRoutes
];

export const appRoutingProviders: any[] = [
  authProviders,
  CanDeactivateGuard
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
