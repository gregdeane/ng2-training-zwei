import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule, ROUTING_COMPONENTS } from './app.routing';
import { AppService } from './app.service';
import { ENV_PROVIDERS } from './environment';

const APP_PROVIDERS = [
  AppService
];

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
export class AppModule {
  constructor() {}
}
