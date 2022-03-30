import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BookingService} from "../../services/booking.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit {

  string!: string;

  constructor(private _Activatedroute:ActivatedRoute, private bookingService: BookingService, private userService: UserService) {
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(next => console.log(next.get('idVehicle')))


  }

}
