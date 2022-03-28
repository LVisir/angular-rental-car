import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BookingService} from "../../services/booking.service";

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit {

  string!: string;

  constructor(private _Activatedroute:ActivatedRoute, private bookingService: BookingService) {
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((x) => {
      if(x.get('id') !== null) {
        this.bookingService.getBooking(parseInt(<string>x.get('id'))).subscribe({
          next: value => {

          }
        })
      }
    })
  }

  onClick(): void{
    console.log(this.string);
  }

}
