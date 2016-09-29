import { Component } from '@angular/core';

import { AppService } from './app.service';

@Component({
  selector: 'ng2-training',
  template: `
    <nav>
      <ul>
        <li>
          <a [routerLink]="['./home']" routerLinkActive="active">Home</a>
        </li>
        <li>
          <a [routerLink]="['./cities']" routerLinkActive="active">Cities</a>
        </li>
      </ul>
    </nav>
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
  name = 'Angular 2 Training';

  constructor(public appService: AppService) {}

  ngOnInit() {
    console.log('Initial app title', this.appService.title);
  }
}
