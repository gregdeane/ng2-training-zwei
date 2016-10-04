import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AppService } from '../app.service';
import { ChildRouting } from './child-routing.model';
import { ChildRoutingService } from './child-routing.service';

@Component({
  template: `
    <h1>{{ view }}</h1>
    <p>Routes loaded using Child Routing</p>
    <div class="list-group">
      <button *ngFor="let person of persons"
              (click)="onSelect(person)"
              class="list-group-item list-group-item-action">
        {{ person.name }}
      </button>
    </div>
  `
})
export class ChildRoutingListComponent {
  private selectedId: number;
  view = 'People';
  persons: ChildRouting[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private childRoutingService: ChildRoutingService
  ) {
    this.appService.setTitle(this.view);
  }

  // route params provided as Observable (explaining `forEach` usage)
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.selectedId = +params['id'];
      this.persons = this.childRoutingService.getPersons();
    });
  }

  onSelect(person: ChildRouting): void {
    this.router.navigate([person.id], { relativeTo: this.route });
  }
}
