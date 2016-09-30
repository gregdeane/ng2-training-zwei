import { Component } from '@angular/core';

/**
 * Child Routing
 *
 * Since this component is not embedded in a parent template, there is no need for a selector.
 * Instead, we navigate to it from the outside, via the router. a.k.a "Child Routing"
 *
 * All components within this feature are without a selector.
 */
@Component({
  template: `
    <router-outlet></router-outlet>
  `
})
export class PersonComponent {}
