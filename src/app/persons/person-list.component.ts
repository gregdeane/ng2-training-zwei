import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AppService } from '../app.service';
import { Person } from './person.model';
import { PersonService } from './person.service';

@Component({
  template: `
    <h1>{{ view }}</h1>
    <div class="list-group">
      <button *ngFor="let person of persons"
              (click)="onSelect(person)"
              class="list-group-item list-group-item-action">
        {{ person.name }}
      </button>
    </div>
  `
})
export class PersonListComponent {
  private selectedId: number;
  view = 'People';
  persons: Person[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private personService: PersonService
  ) {
    this.appService.setTitle(this.view);
  }

  // route params provided as Observable (explaining `forEach` usage)
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.selectedId = +params['id'];
      this.persons = this.personService.getPersons();
    });
  }

  onSelect(person: Person): void {
    this.router.navigate([person.id], { relativeTo: this.route });
  }
}
