import { Component, OnInit } from '@angular/core';
import {BookingService} from "../../services/booking.service";
import {Booking} from "../../../interfaces/Booking";
import {TableTools} from "../../../classes/TableTools";
import {TableUtility} from "../../../interfaces/TableUtility";
import {HeaderTableDatabase} from "../../../interfaces/HeaderTableDatabase";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent extends TableTools<Booking> implements OnInit, TableUtility<Booking> {

  constructor(private bookingService: BookingService) {
    super();
  }

  ngOnInit(): void {

    this.dbHeader = ['idBooking', 'start', 'end', 'user', 'vehicle', 'approval'];

    this.bookingService.getBookings().subscribe({
      next: bookings => {
        this.list = bookings;
        this.currentPage = bookings.length > 0 ? 1 : 0;
        this.currentPages = this.getCurrentPages(bookings.length);
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

  tableDbHeader: HeaderTableDatabase[] = [
    {
      headerTable: 'Id',
      headerDb: ['idBooking'],
      state: 0,
      sortable: true
    },
    {
      headerTable: 'Start date',
      headerDb: ['start'],
      state: 0,
      sortable: true
    },
    {
      headerTable: 'End date',
      headerDb: ['end'],
      state: 0,
      sortable: true
    },
    {
      headerTable: 'User Id',
      headerDb: ['user', 'idUser'],
      state: 0,
      sortable: true
    },
    {
      headerTable: 'Vehicle Id',
      headerDb: ['vehicle', 'idVehicle'],
      state: 0,
      sortable: true
    },
    {
      headerTable: 'Approval',
      headerDb: ['Approval'],
      sortable: false
    },
  ]

}
