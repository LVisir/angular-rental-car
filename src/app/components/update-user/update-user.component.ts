import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../../interfaces/User";
import {ActivatedRoute, Router} from "@angular/router";
import {Error} from "../../../classes/Error";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent extends Error implements OnInit {

  name!: string;
  surname!: string;
  birthDate!: string;
  email!: string;
  password!: string;
  cf!: string;
  user!: User;

  constructor(private userService: UserService, private _Activatedroute:ActivatedRoute, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(x => {
      if(x.get('id') !== null) {
        this.userService.getUser(parseInt(<string>x.get('id'))).subscribe({
          next: value => {
            this.user = value;
            this.name = value.name;
            this.surname = value.surname;
            this.birthDate = value.birthDate;
            this.email = value.email;
            this.password = value.password;
            this.cf = value.cf;
          }
        })
      }
      else {
        this.router.navigate(['/', 'users'])
      }
    })
  }

  onSubmit(): void {
    if(this.user.idUser !== undefined) {
      this.user.name = this.name;
      this.user.surname = this.surname;
      this.user.birthDate = this.birthDate;
      this.user.email = this.email;
      this.user.password = this.password;
      this.user.cf = this.cf;
      this.userService.updateUser(this.user, this.user.idUser).subscribe({
        next: () => {
          this.router.navigate(['/', 'users'])
        },
        error: err => {
          this.manageError(err)
        }
      })
    }
    else {
      this.router.navigate(['/', 'users'])
    }
  }

}
