import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../../Interfaces/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  errorMessage!: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: users => {
        this.users = users;
      },
      error: err => {
        this.errorMessage = err.error.error;
      }
    });
  }

  printUsers(): void {
      this.userService.getUsers()
        .subscribe({
          next: c => {
            console.log(c)
          },
          error: error => {
            console.log(error.error.error)
          }
        });
  }

  testDelete(): void {
    this.userService.deleteUser(9922282803)
      .subscribe({
        error: err => {
          console.log(err)
        }
      })
  }

}
