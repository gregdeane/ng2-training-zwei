import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AppService } from '../app.service';
import { City } from './city.model';
import { CityService } from './city.service';

@Component({
  selector: 'city-list',
  template: `
    <h1>{{ view }}</h1>
    <div class="list-group">
      <button *ngFor="let city of cities"
              [class.active]="isActive(city)"
              (click)="onSelect(city)"
              class="list-group-item list-group-item-action">
        {{ city.name }}
      </button>
    </div>
  `
})
export class CityListComponent {
  private selectedId: number;
  view = 'Cities';
  cities: City[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private service: CityService
  ) {
    this.appService.setTitle(this.view);
  }

  // route params provided as Observable (explaining `forEach` usage)
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.selectedId = +params['id'];
      this.cities = this.service.getCities();
    });
  }

  onSelect(city: City): void {
    this.router.navigate(['/city', city.id]);
  }

  isActive(city: City): boolean {
    return city.id === this.selectedId;
  }
}
