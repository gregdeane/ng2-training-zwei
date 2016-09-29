import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CityListComponent } from './city-list.component';
import { CityDetailComponent } from './city-detail.component';

const cityRoutes: Routes = [
  { path: 'cities', component: CityListComponent },
  { path: 'city/:id', component: CityDetailComponent }
];

export const citiesRoutingProviders: any[] = [

];

export const citiesRouting: ModuleWithProviders = RouterModule.forChild(cityRoutes);
