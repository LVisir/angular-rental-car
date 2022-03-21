import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.userService.login(`email=${this.email}&password=${this.password}`)
      .subscribe({
        next: user => {
          console.log(user);
        },
        error: err => {
          console.log(err);
        }
      })
  }

}
