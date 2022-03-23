import { Component, OnInit } from '@angular/core';
import {BookingService} from "../../services/booking.service";
import {Booking} from "../../../interfaces/Booking";
import {TableConfigService} from "../../services/table-config.service";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookingsList: Booking[] = [];
  bookingHeaderFields: string[] = [];
  currentPage!: number;
  errorMessage: string = '';
  currentPages: number[] = [];
  dataSize!: number;

  /**
   * function to normal key property order for keyvalue pipe
   */
  returnZero(): number {
    return 0
  }

  constructor(private bookingService: BookingService, private tableConfigService: TableConfigService) { }

  ngOnInit(): void {

    this.bookingHeaderFields = ['Id', 'Start date', 'End date', 'User Id', 'Vehicle Id', 'Approval'];

    this.bookingService.getBookings().subscribe({
      next: bookings => {
        this.bookingsList = bookings;
        this.currentPage = bookings.length > 0 ? 1 : 0;
        this.currentPages = this.tableConfigService.getCurrentPages(bookings.length);
        this.dataSize = Math.floor(bookings.length/10);
      },
      error: err => {
        this.errorMessage = err.error.error;
      }
    });

  }

  mapping(booking: Booking): Map<any, any> {
    const mapObj = new Map()
    mapObj.set('idBooking', booking.idBooking);
    mapObj.set('start', booking.start);
    mapObj.set('end', booking.end);
    mapObj.set('user', booking.user.idUser);
    mapObj.set('vehicle', booking.vehicle.idVehicle);
    mapObj.set('approval', booking.approval);
    return mapObj;
  }

}
