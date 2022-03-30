import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

// To have icons
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

// To have http request tools
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

// To bind field to form input
import {FormsModule} from '@angular/forms';

// For routing
import {RouterModule, Routes} from '@angular/router';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {UsersComponent} from './components/users/users.component';
import {ButtonComponent} from './components/button/button.component';
import {LoginComponent} from './components/login/login.component';
import {BookingComponent} from './components/booking/booking.component';
import {AddBookingComponent} from './components/add-booking/add-booking.component';
import {CustomTableComponent} from './components/custom-table/custom-table.component';
import {VehicleComponent} from './components/vehicle/vehicle.component';
import {UpdateBookingComponent} from './components/update-booking/update-booking.component';
import {UpdateUserComponent} from './components/update-user/update-user.component';
import {UpdateVehicleComponent} from './components/update-vehicle/update-vehicle.component';
import {ErrorComponent} from './components/error/error.component';
import {HasRoleGuard} from "./has-role.guard";
import {HeadersInterceptor} from "./interceptors/headers.interceptor";

// route path for components
const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'bookings', component: BookingComponent},
  {path: 'bookings/update-booking/:id', component: UpdateBookingComponent},
  {
    path: 'bookings/add-booking/:idVehicle',
    component: AddBookingComponent,
    canActivate: [HasRoleGuard],
    data: {role: 'customer'}
  },
  {path: 'users', component: UsersComponent, canActivate: [HasRoleGuard], data: {role: 'superuser'}},
  {
    path: 'users/update-user/:id',
    component: UpdateUserComponent,
    canActivate: [HasRoleGuard],
    data: {role: 'superuser'}
  },
  {path: 'vehicles', component: VehicleComponent},
  {
    path: 'vehicles/update-vehicle/:id',
    component: UpdateVehicleComponent,
    canActivate: [HasRoleGuard],
    data: {role: 'superuser'}
  }
]

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ButtonComponent,
    LoginComponent,
    BookingComponent,
    AddBookingComponent,
    CustomTableComponent,
    VehicleComponent,
    UpdateBookingComponent,
    UpdateUserComponent,
    UpdateVehicleComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false})
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
