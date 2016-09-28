import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppService } from '../app.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let appService: AppService;
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let el: DebugElement;
  let mock: any;

  beforeEach(setup);

  it('should display original view name', () => {
    fixture.detectChanges();
    expect(el.nativeElement.textContent).toContain(component.view);
  });

  it('should display different view name', () => {
    component.view = mock.view;
    fixture.detectChanges();
    expect(el.nativeElement.textContent).toContain(mock.view);
  });

  //////////////////////

  function setup() {
    mocks();
    testbed();
    configure();
  }

  function testbed(): void {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: AppService, useValue: mock.appService }]
    });
  }

  function configure(): void {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    appService = fixture.debugElement.injector.get(AppService);
    el = fixture.debugElement.query(By.css('h1'));
  }

  function mocks(): void {
    mock = {
      view: 'New View',
      appService: {
        setTitle: () => {}
      }
    };
  }

});
