import { Injectable } from '@angular/core';

import { Person } from './person.model';
import { PERSONS } from './persons.mock';

@Injectable()
export class PersonService {

  getPersons(): Person[] {
    return PERSONS;
  }

  getPerson(id: number): Person {
    return this.getPersons().filter((p: Person) => {
      return id === p.id
    })[0];
  }

}
