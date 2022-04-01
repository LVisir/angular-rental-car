import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookingService} from "../../services/booking.service";
import {UserService} from "../../services/user.service";
import {VehicleService} from "../../services/vehicle.service";
import {Vehicle} from "../../../interfaces/Vehicle";
import {User} from "../../../interfaces/User";
import {concatMap} from 'rxjs/operators';
import {Error} from "../../../classes/Error";
import {Booking} from "../../../interfaces/Booking";


@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent extends Error implements OnInit {

  // url param
  vehicleId!: string | null;

  vehicle!: Vehicle;
  customer!: User;

  // fields of Booking entity
  start!: string;
  end!: string;

  constructor(private _Activatedroute:ActivatedRoute,
              private bookingService: BookingService,
              private userService: UserService,
              private vehicleService: VehicleService,
              private router: Router) {
    super();}

  ngOnInit(): void {

    // fetch param from url
    this._Activatedroute.paramMap.subscribe(next => this.vehicleId = next.get('idVehicle'))

    // this component can be loaded only if an url param has been sent
    if(this.vehicleId === null) {
      this.router.navigate(['/bookings'])
    }
    else{
      this.vehicleService.getVehicle(parseInt(this.vehicleId))
        .pipe(concatMap(value => {
          return this.vehicleService.getLastBookingDateOfVehicle(<number>value.idVehicle, parseInt(<string>sessionStorage.getItem('userId')))
        }))
        .subscribe({
          next: value => {
            // fill the form with the retrieved data
            this.start = value['startDate']
            this.end = value['endDate']
          },
          error: () => {
            // a not valid vehicleId has been sent as a url param
            this.router.navigate(['/bookings'])
          }
        })
    }

  }

  onSubmit = () => {

    // create the Booking to insert
    const booking: Booking = {
      actions: [],
      start: this.start,
      end: this.end,
      vehicle: {
        idVehicle: parseInt(<string>this.vehicleId)
      },
      user: {
        idUser: parseInt(<string>sessionStorage.getItem('userId'))
      },
      approval: false
    }

    this.bookingService.insertBooking(booking).subscribe({
      next: () => {
        this.router.navigate(['/bookings'])
      },
      error: err => {
        // violation of some constraint during the insert
        this.manageError(err)
      }
    })
  }

}
