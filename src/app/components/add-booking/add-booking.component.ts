import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit {

  string!: string | null;

  constructor(private _Activatedroute:ActivatedRoute) {
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((x) => {
      this.string = x.get('id');
    })
  }

  onClick(): void{
    console.log(this.string);
  }

}
