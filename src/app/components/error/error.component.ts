import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  @Input() message!: string;

  constructor(private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((x) => {
      if(x.get('errorMessage') !== null){
        this.message = <string>x.get('errorMessage')
      }
    })
  }

}
