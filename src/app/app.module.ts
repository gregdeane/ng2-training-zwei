import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ENV_PROVIDERS } from './environment';
import { AppRoutingModule, ROUTING_COMPONENTS } from './app.routes';

import AppComponent from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InteralStateType } from './app.service';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InteralStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

@NgModule({
  declarations: [
    AppComponent,
    ROUTING_COMPONENTS
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    APP_PROVIDERS,
    ENV_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
class AppModule {

  constructor(public appState: AppState) {}
}

export default AppModule;
