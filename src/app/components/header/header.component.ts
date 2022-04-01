import {Component, Input, OnInit} from '@angular/core';
import {NavbarElement} from "../../../interfaces/NavbarElement";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() paths!: NavbarElement[];

  sessionStorage = sessionStorage

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    sessionStorage.removeItem('customer')
    sessionStorage.removeItem('superuser')
    sessionStorage.removeItem('tokenJWT')
    sessionStorage.removeItem('userId')
    this.router.navigate([''])
  }

}
