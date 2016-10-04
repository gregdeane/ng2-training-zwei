import { Routes } from '@angular/router';

import { AuthGuard } from '../auth-guard.service';
import { AuthService } from '../auth.service';

import { LoginComponent } from './login.component';

export const loginRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];

// Guards and the service providers they require must be provided at the module-level. This allows
// the Router access to retrieve these services from the `Injector` during the navigation process.
// The same rule applies for feature modules loaded asynchronously.
export const authProviders = [
  AuthGuard,
  AuthService
];
