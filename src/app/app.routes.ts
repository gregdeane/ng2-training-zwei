import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import HomeComponent from './home';
import PageNotFoundComponent from './404';

const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
];

//{ path: 'detail', loadChildren: () => System.import('./+detail') },

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const ROUTING_COMPONENTS = [HomeComponent, PageNotFoundComponent];
