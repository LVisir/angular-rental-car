import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookingService} from "../../services/booking.service";
import {UserService} from "../../services/user.service";
import {VehicleService} from "../../services/vehicle.service";
import {Vehicle} from "../../../interfaces/Vehicle";
import {User} from "../../../interfaces/User";
import {concatMap, map} from 'rxjs/operators';
import {Error} from "../../../classes/Error";
import {Booking} from "../../../interfaces/Booking";

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent extends Error implements OnInit {

  vehicleId!: string | null;
  vehicle!: Vehicle;
  customer!: User;
  start!: string;
  end!: string;

  constructor(private _Activatedroute:ActivatedRoute,
              private bookingService: BookingService,
              private userService: UserService,
              private vehicleService: VehicleService,
              private router: Router) {
    super();}

  ngOnInit(): void {

    this._Activatedroute.paramMap.subscribe(next => this.vehicleId = next.get('idVehicle'))

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
            this.start = value['startDate']
            this.end = value['endDate']
          },
          error: () => {
            this.router.navigate(['/bookings'])
          }
        })
    }

  }

  onSubmit = () => {

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
        this.manageError(err)
      }
    })
  }

}
