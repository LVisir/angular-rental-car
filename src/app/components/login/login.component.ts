import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  sessionStorage = sessionStorage

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
            userModel.sub && sessionStorage.setItem('superuser', userModel.sub)
            break
          case 'CUSTOMER':
            userModel.sub && sessionStorage.setItem('customer', userModel.sub)
            break
        }

        sessionStorage.setItem('tokenJWT', user.access_token)

        this.userService.getUserByEmail(userModel.sub).subscribe(next => this.userService.setUserObservable({
          id: next.idUser
        }))

        return '/bookings'
      }))
      .subscribe({
        next: pathToGo => {
          this.router.navigate([pathToGo])
        },
        error: () => {
          this.errorMessage = 'Internal server error'
        }
      })


  }

}
