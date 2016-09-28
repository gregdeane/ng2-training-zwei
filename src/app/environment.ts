import { enableDebugTools, disableDebugTools } from '@angular/platform-browser';
import { enableProdMode, ApplicationRef } from '@angular/core';

// common env directives
let PROVIDERS: any[] = [

];

// Angular debug tools in the dev console
// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
let _decorateModuleRef = function identity<T>(value: T): T { return value; };

if ('production' === ENV) {
  disableDebugTools();
  enableProdMode();

  // custom providers in production
  PROVIDERS = [
    ...PROVIDERS,
  ];

} else {

  _decorateModuleRef = (modRef: any) => {
    const appRef = modRef.injector.get(ApplicationRef);
    const cmpRef = appRef.components[0];

    let _ng = (<any>window).ng;
    enableDebugTools(cmpRef);
    (<any>window).ng.probe = _ng.probe;
    (<any>window).ng.coreTokens = _ng.coreTokens;
    return modRef;
  };

  // custom providers in development
  PROVIDERS = [
    ...PROVIDERS,
  ];

}

export const decorateModuleRef = _decorateModuleRef;
export const ENV_PROVIDERS = [
  ...PROVIDERS
];
