import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AppService } from '../app.service';
import { Person } from './person.model';
import { PersonService } from './person.service';

@Component({
  template: `
    <h1>{{ person.name }}</h1>
    <div *ngIf="person">
      <div>
        <label>Id:</label>
        {{ person.id }}
      </div>
      <div>
        <label>Name:</label>
        <input [(ngModel)]="person.name" placeholder="name">
      </div>
      <button (click)="viewPersons()">Back</button>
    </div>
  `
})
export class PersonDetailComponent {
  person: Person;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private personService: PersonService
  ) {}

  // route params provided as Observable (explaining `forEach` usage)
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.person = this.personService.getPerson(id);
      this.appService.setTitle(this.person.name);
    });
  }

  viewPersons(): void {
    let id = (this.person && this.person.id) || null;
    this.router.navigate(['/persons', { id: id }]);
  }
}
