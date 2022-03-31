import {Component, OnInit} from '@angular/core';
import {BookingService} from "../../services/booking.service";
import {Booking} from "../../../interfaces/Booking";
import {TableTools} from "../../../classes/TableTools";
import {TableUtility} from "../../../interfaces/TableUtility";
import {HeaderTableDatabase} from "../../../interfaces/HeaderTableDatabase";
import {Actions} from "../../../interfaces/Actions";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

// for nested Observables
import {concatMap} from "rxjs/operators";

// to create fast Observables
import {of} from "rxjs";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent extends TableTools<Booking> implements OnInit, TableUtility<Booking> {

  constructor(private bookingService: BookingService, private router: Router, private userService: UserService) {
    super();
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
          this.router.navigate(['/wrong-page'], {replaceUrl: true})
        } else if (err.error !== null && err.error.error) {
          this.errorMessage = err.error.error;
        } else {
          this.errorMessage = 'Internal Server Error'
        }
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

    if(sessionStorage.getItem('superuser') !== null) {
      actions.push({...action1})
    }
    actions.push({...action2})
    actions.push({...action3})

    object.map(x => {
      if(sessionStorage.getItem('superuser') !== null) {
        actions[0] = {...actions[0], disable: x.approval}
      }
      this.list.push({...x, actions: [...actions]})
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
      return booking.idBooking !== updtBooking.idBooking ? booking : updtBooking
    })
  }


}
