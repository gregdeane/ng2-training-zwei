import { Injectable } from '@angular/core';

export type InteralStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {
  private state: InteralStateType = { };

  constructor() {}

  // already return a clone of the current state
  get state() {
    return this.state = this.clone(this.state);
  }

  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  // use our state getter for the clone
  get(prop?: any) {
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  // internally mutate our state
  set(prop: string, value: any) {
    return this.state[prop] = value;
  }

  // simple object clone
  private clone(object: InteralStateType) {
    return JSON.parse(JSON.stringify(object));
  }
}
