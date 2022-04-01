import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookingService} from "../../services/booking.service";
import {Booking} from "../../../interfaces/Booking";
import {Error} from "../../../classes/Error";

@Component({
  selector: 'app-update-booking',
  templateUrl: './update-booking.component.html',
  styleUrls: ['./update-booking.component.css']
})
export class UpdateBookingComponent extends Error implements OnInit {

  // start and end date available
  startDate!: string;
  endDate!: string;

  booking!: Booking;

  constructor(private _Activatedroute: ActivatedRoute, private bookingService: BookingService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((x) => {
      // this component can be access just by sending an url param with a Booking id
      if (x.get('id') !== null) {
        this.bookingService.getBooking(parseInt(<string>x.get('id'))).subscribe({
          next: value => {
            this.startDate = value.start;
            this.endDate = value.end;
            this.booking = value;
          }
        })
      } else {
        this.router.navigate(['/', 'bookings'])
      }
    })
  }

  onSubmit(): void {
    this.booking.start = this.startDate;
    this.booking.end = this.endDate;
    this.bookingService.updateBooking(this.booking, <number>this.booking.idBooking).subscribe({
      next: () => {
        this.router.navigate(['/', 'bookings'])
      },
      error: err => {
        this.manageError(err)
      }
    })
  }

}
