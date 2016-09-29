import { Injectable } from '@angular/core';

import { City } from './city.model';
import { CITIES } from './cities.mock';

@Injectable()
export class CityService {

  getCities(): City[] {
    return CITIES;
  }

  getCity(id: number): City {
    return this.getCities().filter((c: City) => {
      return id === c.id
    })[0];
  }

}
