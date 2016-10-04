import { Component } from '@angular/core';

import { AppService } from '../app.service';

@Component({
  template: `
    <p>{{ view }}</p>
  `
})
export class ManagePersonsComponent {
  view = 'Manage People';

  constructor(private appService: AppService) {
    this.appService.setTitle(this.view);
  }
}
