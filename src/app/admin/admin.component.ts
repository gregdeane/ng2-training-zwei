import { Component } from '@angular/core';

import { AppService } from '../app.service';

@Component({
  template: `
    <h1>{{ view }}</h1>
    <nav>
      <a routerLink="./" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
        Dashboard
      </a>
      <a routerLink="./persons" routerLinkActive="active">
        Manage People
      </a>
      <a routerLink="./cities" routerLinkActive="active">
        Manage Cities
      </a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AdminComponent {
  view = 'Admin';
}
