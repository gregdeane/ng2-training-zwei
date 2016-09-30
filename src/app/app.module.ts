import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';
import { AppService } from './app.service';
import { PersonModule } from './persons';
import { CitiesModule } from './cities';
import { ENV_PROVIDERS } from './environment';
import { HomeComponent } from './home';
import { PageNotFoundComponent } from './404';

const APP_PROVIDERS = [
  appRoutingProviders,
  AppService
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CitiesModule,
    PersonModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  providers: [
    APP_PROVIDERS,
    ENV_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
