import { Component } from '@angular/core';

import { AppService } from '../app.service';

@Component({
  selector: 'page-not-found-component',
  template: `
    <h1>Page Not Found</h1>
  `
})
export class PageNotFoundComponent {
  view = 'Page Not Found';

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.setTitle(this.view);
  }
}
