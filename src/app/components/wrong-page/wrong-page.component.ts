import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-wrong-page',
  templateUrl: './wrong-page.component.html',
  styleUrls: ['./wrong-page.component.css']
})
export class WrongPageComponent implements OnInit {

  message: string = 'Forbidden page'

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  backToHomePage = () => {
    this.router.navigate([''])
  }

}
