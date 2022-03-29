import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
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
      .subscribe({
        next: user => {
          let userModel = this.userService.getUserModel(user.access_token)
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-type': 'application/json',
              'Authorization': `LoginToken ${user.access_token}`
            }),
          };
          this.userService.getUserByEmail(userModel.sub, httpOptions).subscribe({
            next: value => {

              if (value.password === this.password) {
                switch (userModel.roles[0]) {
                  case 'SUPERUSER':
                    sessionStorage.setItem('superuser', value.email)
                    break
                  case 'CUSTOMER':
                    sessionStorage.setItem('customer', value.email)
                    break
                }
                sessionStorage.setItem('tokenJWT', user.access_token)
                this.router.navigate(['/bookings'])
              } /*else {
                throw new Error()
              }*/
            }/*,
            error: () => {
              throw new Error()
            }*/
          })

        },
        error: () => {
          this.errorMessage = 'Some credentials are wrong'
        }
      })
  }

}
