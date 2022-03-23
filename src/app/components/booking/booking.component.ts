import { Component, OnInit } from '@angular/core';
import {TableConfigService} from "../../services/table-config.service";
import {BookingService} from "../../services/booking.service";
import { TableFieldInfo } from '../../../classes/TableFieldInfo';
import {Booking} from "../../../interfaces/Booking";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookingsList: Booking[] = [];
  bookingDbFields: string[] = [];
  bookingHeaderFields: string[] = [];

  /**
   * function to normal key property order for keyvalue pipe
   */
  returnZero() {
    return 0
  }

  constructor(private tableConfig: TableConfigService, private bookingService: BookingService) { }

  ngOnInit(): void {
    this.tableConfig.dbFields = ['idBooking', 'start','end', 'user', 'vehicle', 'approval'];
    this.bookingDbFields = ['start','end', 'idBooking', 'user', 'vehicle', 'approval'];
    this.bookingHeaderFields = ['Id', 'Start date', 'End date', 'User Id', 'Vehicle Id', 'Approval'];
    this.bookingService.getBookings().subscribe((bookings) => {
      this.tableConfig.list = bookings;
      this.bookingsList = bookings;
    });
    this.tableConfig.dataSize = Math.floor(this.bookingsList.length/10);
    this.tableConfig.currentPage = 1;
    this.tableConfig.currentPages = this.tableConfig.getCurrentPages(this.bookingsList.length);
    this.tableConfig.searchableFields = ['start','end', 'idBooking', 'user', 'vehicle'];
    this.tableConfig.searchText = '';
    this.tableConfig.filterSearchText = '';
    this.tableConfig.searchButtonClicked = false;
    this.tableConfig.disableResetHeaderButton = true;
    this.tableConfig.disableResetPaginationButton = true;
    this.tableConfig.disableResetTableButton = true;
    this.tableConfig.fieldObjects = [
      new TableFieldInfo(this.bookingDbFields[0], this.bookingHeaderFields[0], true, ''),
      new TableFieldInfo(this.bookingDbFields[1], this.bookingHeaderFields[1], true, ''),
      new TableFieldInfo(this.bookingDbFields[2], this.bookingHeaderFields[2], true, ''),
      new TableFieldInfo(this.bookingDbFields[3], this.bookingHeaderFields[3], true, ''),
      new TableFieldInfo(this.bookingDbFields[4], this.bookingHeaderFields[4], true, ''),
      new TableFieldInfo(this.bookingDbFields[5], this.bookingHeaderFields[5], false, ''),
    ]
  }

  mapObj = new Map()

  mapping(booking: Booking): Map<any, any> {
    this.mapObj.set('idBooking', booking.idBooking);
    this.mapObj.set('start', booking.start);
    this.mapObj.set('end', booking.end);
    this.mapObj.set('user', booking.user.idUser);
    this.mapObj.set('vehicle', booking.vehicle.idVehicle);
    this.mapObj.set('approval', booking.approval);
    return this.mapObj
  }

}
