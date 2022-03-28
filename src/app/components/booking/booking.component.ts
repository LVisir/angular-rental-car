import {Component, OnInit} from '@angular/core';
import {BookingService} from "../../services/booking.service";
import {Booking} from "../../../interfaces/Booking";
import {TableTools} from "../../../classes/TableTools";
import {TableUtility} from "../../../interfaces/TableUtility";
import {HeaderTableDatabase} from "../../../interfaces/HeaderTableDatabase";
import {Actions} from "../../../interfaces/Actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent extends TableTools<Booking> implements OnInit, TableUtility<Booking> {

  constructor(private bookingService: BookingService, private router: Router) {
    super();
  }

  ngOnInit(): void {

    this.dbHeader = ['idBooking', 'start', 'end', 'user', 'vehicle', 'approval'];

    this.bookingService.getBookings().subscribe({
      next: bookings => {
        this.attachActions(bookings);
        this.currentPage = bookings.length > 0 ? 1 : 0;
        this.currentPages = this.getCurrentPages(bookings.length);
        this.dataSize = Math.floor(bookings.length / 10);
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

  attachActions(object: Booking[]): void {

    const deleteBooking = (id: number) => {
      this.delete(id)
    }

    const updateBookingsList = (id: number) => {
      this.updateList(id)
    }

    const moveToUpdatePage = (id: number) => {
      this.move(id)
    }

    let action2 = this.action = {
      name: 'Delete',
      execute(obj: Booking) {
        if (obj.idBooking !== undefined) {
          deleteBooking(obj.idBooking)
          updateBookingsList(obj.idBooking)
        }
      },
      type: 'OnPlace'
    }

    let action3 = this.action = {
      name: 'Edit',
      async execute(obj: Booking) {
        if (obj.idBooking !== undefined) {
          await moveToUpdatePage(obj.idBooking)
        }
      },
      type: 'Move'
    }

    let actions: Actions[] = [
      {...action2}, {...action3}
    ]

    object.map(x => {
      this.list.push({...x, actions: actions})
    })

    this.totalActions = actions.length

  }

  delete(id: number): void {
    this.bookingService.deleteBooking(id).subscribe({
      error: err => console.log(err)
    })
  }

  updateList(id: number): void {
    this.list = this.list.filter(x => {
      return x.idBooking !== id && x
    })
  }

  move(id: number): void {
    this.router.navigate(['/bookings/update-booking', id])
  }


}
