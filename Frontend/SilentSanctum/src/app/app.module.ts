import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/envronmet';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // AuthModule.forRoot(environment.auth),
    AuthModule.forRoot({
      domain: 'dev-yhlqy75o81n2y7y6.us.auth0.com',
      clientId: 'f4mPTWqyTXtMb9FkDT8R490Dwsr9TUtA',
      authorizationParams: {
        redirect_uri: 'http://localhost:4200/home'
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
