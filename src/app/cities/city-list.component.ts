import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { City } from './city.model';
import { CityService } from './city.service';

@Component({
  selector: 'city-list',
  template: `
    <h2>Cities</h2>
    <ul>
      <li *ngFor="let city of cities"
          [class.selected]="isSelected(city)"
          (click)="onSelect(city)">
        {{ city.name }}
      </li>
    </ul>
  `
})
export class CityListComponent {
  private selectedId: number;
  cities: City[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CityService
  ) {}

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

  isSelected(city: City): boolean {
    return city.id === this.selectedId;
  }
}
