import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

export type InteralStateType = {
  [key: string]: any
};

@Injectable()
export class AppService {
  title = 'Angular 2 Training';

  constructor(private titleService: Title) {}

  setTitle(view: string): void {
    this.titleService.setTitle(`${this.title} / ${view}`);
  }
}
