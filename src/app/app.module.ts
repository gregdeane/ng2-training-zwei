import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';
import { AppService } from './app.service';
import { AdminModule } from './admin';
import { AuthService } from './auth.service';
import { ChildRoutingModule } from './child-routing';
import { CitiesModule } from './cities';
import { ENV_PROVIDERS } from './environment';
import { HomeComponent } from './home';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './404';

const APP_PROVIDERS = [
  appRoutingProviders,
  AppService,
  AuthService
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AdminModule,
    CitiesModule,
    ChildRoutingModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  providers: [
    APP_PROVIDERS,
    ENV_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
