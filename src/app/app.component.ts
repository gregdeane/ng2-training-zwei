import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ng2-training',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./app.style.scss')],
  template: `
    <div class="container">
      <nav class="navbar navbar-light bg-faded">
        <div class="nav navbar-nav">
          <a [routerLink]="['./home']" routerLinkActive="active" class="nav-item nav-link">
            Home
          </a>
          <a [routerLink]="['./cities']" routerLinkActive="active" class="nav-item nav-link">
            Cities
          </a>
          <a [routerLink]="['./persons']" routerLinkActive="active" class="nav-item nav-link">
            Child Routing
          </a>
          <a [routerLink]="['./admin']" routerLinkActive="active" class="nav-item nav-link">
            Admin
          </a>
          <a [routerLink]="['./login']" routerLinkActive="active" class="nav-item nav-link">
            Login
          </a>
          <a [routerLink]="['./404']" routerLinkActive="active" class="nav-item nav-link">
            404
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
