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

        this.userService.getUserByEmail(this.email, {
          headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': `LoginToken ${user.access_token}`
          }),
        }).subscribe({
          next: value => {
            switch (userModel.roles[0]) {
              case 'SUPERUSER':
                value.idUser && sessionStorage.setItem('superuser', String(value.idUser))
                break
              case 'CUSTOMER':
                value.idUser && sessionStorage.setItem('customer', String(value.idUser))
                break
            }
          },
          error: () => {
            throw new Error('')
          }
        })

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
