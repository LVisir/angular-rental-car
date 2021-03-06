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

  // implementation from TableUtility<T> interface
  reset(): void {
    this.bookingService.getBookings().subscribe({
      next: bookings => {
        this.list = []
        this.attachActions(bookings);
        this.currentPages = this.getCurrentPages(bookings.length);
        this.dataSize = Math.floor(bookings.length / 10);
        this.errorMessage = ''
      },
      error: () => {
        this.errorMessage = 'No result/s found'
      }
    })
  }

  ngOnInit(): void {

    this.dbHeader = ['idBooking', 'start', 'end', 'user', 'vehicle', 'approval'];

    this.errorMessage = ''

    this.bookingService.getBookings().subscribe({
      next: bookings => {
        this.attachActions(bookings);
        this.currentPage = bookings.length > 0 ? 1 : 0;
        this.currentPages = this.getCurrentPages(bookings.length);
        this.dataSize = Math.floor(bookings.length / 10);
      },
      error: err => {
        if (err.status && err.status === 403) {
          // an authorized user tried to access this component
          this.router.navigate(['/wrong-page'], {replaceUrl: true})
        } else if (err.error !== null && err.error.error) {
          this.errorMessage = err.error.error;
        } else {
          this.errorMessage = 'Internal Server Error'
        }
      }
    });

  }

  // implementation from TableUtility<T> interface
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
      headerDb: ['approval'],
      sortable: false
    },
  ]

  // implementation from TableUtility<T> interface
  attachActions(object: Booking[]): void {

    const approveBooking = (booking: Booking) => {
      this.approves(booking)
    }

    const updtBooking = (updtBooking: Booking) => {
      this.updateBooking(updtBooking)
    }

    let action1 = this.action = {
      name: 'Approves',
      execute(obj: Booking) {
        approveBooking(obj)
        updtBooking(obj)
        this.disable = true
      },
      type: 'OnPlace',
      color: 'MediumSlateBlue',
      disable: false
    }

    let action2 = this.action = {
      name: 'Delete',
      execute: (obj: Booking) => {
        this.delete(<number>obj.idBooking)
        this.updateList(<number>obj.idBooking)
      },
      type: 'OnPlace',
      color: 'MediumSlateBlue',
      disable: false
    }

    let action3 = this.action = {
      name: 'Edit',
      execute: async (obj: Booking) => {
        this.move(<number>obj.idBooking)
      },
      type: 'Move',
      color: 'MediumSlateBlue',
      disable: false
    }

    let actions: Actions[] = []

    if (sessionStorage.getItem('superuser') !== null) {
      actions.push({...action1})
    }
    actions.push({...action2})
    actions.push({...action3})

    object.map(x => {
      if (sessionStorage.getItem('superuser') !== null) {
        actions[0] = {...actions[0], disable: x.approval}
      }
      this.list.push({...x, actions: [...actions]})
    })

    this.totalActions = actions.length

  }

  // implementation from TableUtility<T> interface
  delete(id: number): void {
    this.bookingService.deleteBooking(id).subscribe({
      error: err => console.log(err)
    })
  }

  // implementation from TableUtility<T> interface
  updateList(id: number): void {
    this.list = this.list.filter(x => {
      return x.idBooking !== id && x
    })
  }

  // implementation from TableUtility<T> interface
  move(id: number): void {
    this.router.navigate(['/bookings/update-booking', id])
  }

  /**
   * Method of the SUPERUSER in which he can approve a Booking
   * @param booking
   */
  approves(booking: Booking): void {
    this.bookingService.updateBooking({...booking, approval: true}, <number>booking.idBooking)
      .subscribe({
        error: err => {
          console.log(err)
        }
      })
  }

  updateBooking(updtBooking: Booking): void {
    this.list = this.list.map((booking) => {
      return booking.idBooking !== updtBooking.idBooking ? booking : {...updtBooking, approval: true}
    })
  }

  // implementation from TableUtility<T> interface
  search(field: string, value: string): void {
    this.bookingService.searchBookingsBy(field, value).subscribe({
      next: bookings => {
        this.list = []
        this.attachActions(bookings)
        this.errorMessage = this.list.length > 0 ? '' : this.errorMessage
        this.currentPages = this.getCurrentPages(bookings.length);
        this.dataSize = Math.floor(bookings.length / 10);
      },
      error: err => {
        this.errorMessage = 'No result/s from the search'
        console.log(err)
      }
    })
  }


}
