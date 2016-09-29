import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CityListComponent } from './city-list.component';
import { CityDetailComponent } from './city-detail.component';
import { citiesRouting } from './cities.routing';
import { CityService } from './city.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    citiesRouting
  ],
  declarations: [
    CityListComponent,
    CityDetailComponent
  ],
  providers: [
    CityService
  ]
})
export class CitiesModule {}
