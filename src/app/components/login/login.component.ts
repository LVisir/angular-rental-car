import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import { map } from 'rxjs/operators';
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.errorMessage = ''
    this.userService.login(`email=${this.email}&password=${this.password}`)
      .pipe(map((user) => {
        let userModel = this.userService.getUserModel(user.access_token)
        switch (userModel.roles[0]) {
          case 'SUPERUSER':
            sessionStorage.setItem('superuser', this.email)
            break
          case 'CUSTOMER':
            sessionStorage.setItem('customer', this.email)
            break
        }
        sessionStorage.setItem('tokenJWT', user.access_token)

        return '/bookings'
      }))
      .subscribe({
        next: pathTogo => {
          this.router.navigate([pathTogo])
        },
        error: () => {
          this.errorMessage = 'Some credentials are wrong'
        }
      })
  }

}
