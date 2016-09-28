import { Title } from '@angular/platform-browser';

import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;
  let title: Title = new Title();
  let mock: any;

  beforeEach(setup);

  it('should contain default title', () => {
    expect(appService.title).toEqual('Angular 2 Training');
  });

  it('should set full title', () => {
    appService.setTitle(mock.view);
    expect(mock.titleService.setTitle).toHaveBeenCalledWith(`${appService.title} / ${mock.view}`);
  });

  //////////////////////

  function setup(): void {
    mocks();
    instantiate();
    spies();
  }

  function instantiate(): void {
    appService = new AppService(mock.titleService);
  }

  function spies(): void {
    spyOn(mock.titleService, 'setTitle');
  }

  function mocks(): void {
    mock = {
      view: 'test',
      titleService: {
        setTitle: () => {}
      }
    };
  }
});
