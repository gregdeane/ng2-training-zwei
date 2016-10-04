import { Injectable } from '@angular/core';

import { ChildRouting } from './child-routing.model';
import { PERSONS } from './child-routing.mock';

@Injectable()
export class ChildRoutingService {

  getPersons(): ChildRouting[] {
    return PERSONS;
  }

  getPerson(id: number): ChildRouting {
    return this.getPersons().filter((p: ChildRouting) => {
      return id === p.id
    })[0];
  }

}
