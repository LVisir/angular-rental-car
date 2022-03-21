import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// To have icons
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// To have http request tools
import { HttpClientModule } from '@angular/common/http';

// To bind field to form input
import { FormsModule } from '@angular/forms';

// For routing
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { ButtonComponent } from './components/button/button.component';
import { LoginComponent } from './components/login/login.component';

// route path for components
const appRoutes: Routes = []

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ButtonComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
