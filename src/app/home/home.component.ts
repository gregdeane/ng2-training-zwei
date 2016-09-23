import { Component } from '@angular/core';

@Component({
  selector: 'home-component',
  template: `
    <h1>Home Component</h1>
  `
})
class HomeComponent {

  constructor() {}

  ngOnInit() {
    console.log('Home Component');
  }
}

export default HomeComponent;
