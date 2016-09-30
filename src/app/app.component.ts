import { Component, ViewEncapsulation } from '@angular/core';

import { AppService } from './app.service';

@Component({
  selector: 'ng2-training',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./app.style.scss')],
  template: `
    <div class="container">
      <nav class="navbar navbar-light bg-faded">
        <div class="nav navbar-nav">
          <a [routerLink]="['./home']"
             routerLinkActive="active"
             class="nav-item nav-link active">
            Home
          </a>
          <a [routerLink]="['./cities']"
             routerLinkActive="active"
             class="nav-item nav-link active">
            Cities
          </a>
        </div>
      </nav>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {}
