import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AppService } from '../app.service';
import { City } from './city.model';
import { CityService } from './city.service';

@Component({
  selector: 'city-detail',
  template: `
    <h1>{{ city.name }}</h1>
    <div *ngIf="city">
      <div>
        <label>Id:</label>
        {{ city.id }}
      </div>
      <div>
        <label>Name:</label>
        <input [(ngModel)]="city.name" placeholder="name">
      </div>
      <button (click)="viewCities()">Back</button>
    </div>
  `
})
export class CityDetailComponent {
  city: City;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private service: CityService
  ) {}

  // route params provided as Observable (explaining `forEach` usage)
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.city = this.service.getCity(id);
      this.appService.setTitle(this.city.name);
    });
  }

  viewCities(): void {
    let id = (this.city && this.city.id) || null;
    this.router.navigate(['/cities', { id: id }]);
  }
}
