import { Component, OnInit } from '@angular/core';
import {BookingService} from "../../services/booking.service";
import {Booking} from "../../../interfaces/Booking";
import {TableConfigService} from "../../services/table-config.service";
import {TableTools} from "../../../classes/TableTools";
import {TableFunctions} from "../../../interfaces/TableFunctions";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent extends TableTools<Booking> implements OnInit, TableFunctions<Booking> {

  constructor(private bookingService: BookingService, private tableConfigService: TableConfigService) {
    super();
  }

  ngOnInit(): void {

    this.tableHeader = ['Id', 'Start date', 'End date', 'User Id', 'Vehicle Id', 'Approval'];

    this.bookingService.getBookings().subscribe({
      next: bookings => {
        this.list = bookings;
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
