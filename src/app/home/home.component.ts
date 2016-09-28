import { Component } from '@angular/core';

import { AppService } from '../app.service';

@Component({
  selector: 'home-component',
  styles: [require('./home.style.scss')],
  template: `
    <h1>Component: {{ view }}</h1>
  `
})
export class HomeComponent {
  view = 'Home';

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.setTitle(this.view);
  }
}
