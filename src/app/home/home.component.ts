import { Component } from '@angular/core';

import { AppService } from '../app.service';

@Component({
  selector: 'home-component',
  styles: [require('./home.style.scss')],
  template: `
    <h1>
      {{ view }}
    </h1>
  `
})
export class HomeComponent {
  view = 'Home';

  constructor(private appService: AppService) {
    this.appService.setTitle(this.view);
  }
}
