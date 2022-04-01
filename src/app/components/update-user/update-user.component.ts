import {Component, OnInit} from '@angular/core';
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
  idUser: string = ''

  constructor(private userService: UserService, private _Activatedroute: ActivatedRoute, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(x => {
      if (x.get('id') !== null) {
        this.idUser = <string>x.get('id')
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
    })
  }

  onSubmit(): void {

    this.error = []
    this.validationError = []

    if (!this.name || !this.surname || !this.birthDate ||
      !this.email || !this.password || !this.cf) {
      this.error.push('Fill all the form')
    } else if (this.idUser) {
      this.user.name = this.name;
      this.user.surname = this.surname;
      this.user.birthDate = this.birthDate;
      this.user.email = this.email;
      this.user.password = this.password;
      this.user.cf = this.cf;
      this.userService.updateUser(this.user, <number>this.user.idUser).subscribe({
        next: () => {
          this.router.navigate(['/', 'users'])
        },
        error: err => {
          this.manageError(err)
        }
      })
    } else {
      this.userService.insertUser({
        name: this.name,
        surname: this.surname,
        email: this.email,
        cf: this.cf,
        password: this.password,
        birthDate: this.birthDate,
        role: 'CUSTOMER',
        actions: []
      }).subscribe({
        next: () => {
          this.router.navigate(['/', 'users'])
        },
        error: err => {
          this.manageError(err)
        }
      })
    }
  }

}
