import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {NavbarElement} from "../interfaces/NavbarElement";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {
  }

  title = 'angular-rental-car';
  navbarElements: NavbarElement[] = [
    {
      path: 'Users',
      move: () => {
        this.router.navigate(['/users'])
      }
    },
    {
      path: 'Vehicles',
      move: () => {
        this.router.navigate(['/vehicles'])
      }
    },
    {
      path: 'Bookings',
      move: () => {
        this.router.navigate(['/bookings'])
      }
    }
  ]
  sessionStorage = sessionStorage


}
