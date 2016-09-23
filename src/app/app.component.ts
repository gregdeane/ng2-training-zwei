import { Component } from '@angular/core';

import { AppState } from './app.service';

@Component({
  selector: 'ng2-training',
  styleUrls: ['./app.style.css'],
  template: `
    <nav>
      <ul>
        <li>
          <a [routerLink]="['./']">Index</a>
        </li>
        <li>
          <a [routerLink]="['./home']">Home</a>
        </li>
        <li>
          <a [routerLink]="['./detail']">Detail</a>
        </li>
      </ul>
    </nav>
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
class AppComponent {
  name = 'Angular 2 Training';

  constructor(public appState: AppState) {}

  ngOnInit() {
    console.log('Initial app state', this.appState.state);
  }
}

export default AppComponent;
