import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { City } from './city.model';
import { CityService } from './city.service';

@Component({
  selector: 'city-detail',
  template: `
    <h2>City Detail</h2>
    <div *ngIf="city">
      <h3>
        {{ city.name }}
      </h3>
      <div>
        <label>Id:</label>
        {{ city.id }}
      </div>
      <div>
        <label>Name:</label>
        <input [(ngModel)]="city.name" placeholder="name">
      </div>
      <p>
        <button (click)="viewCities()">
          Back
        </button>
      </p>
    </div>
  `
})
export class CityDetailComponent {
  city: City;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CityService
  ) {}

  // route params provided as Observable (explaining `forEach` usage)
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.city = this.service.getCity(id);
    });
  }

  viewCities(): void {
    let id = (this.city && this.city.id) || null;
    this.router.navigate(['/cities', { id: id }]);
  }
}
