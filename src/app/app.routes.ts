import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import HomeComponent from './home';
import PageNotFoundComponent from './404';

const ROUTES: Routes = [
  { path: '', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'detail', loadChildren: () => System.import('./+detail') },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const ROUTING_COMPONENTS = [HomeComponent, PageNotFoundComponent];
