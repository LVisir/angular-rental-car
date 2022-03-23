import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../../interfaces/User';
import {TableConfigService} from "../../services/table-config.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usersList: User[] = [];
  userTableHeader: string[] = [];
  currentPage!: number;
  errorMessage: string = '';
  currentPages: number[] = [];
  dataSize!: number;

  constructor(private userService: UserService, private tableConfigService: TableConfigService) { }

  ngOnInit(): void {

    this.userTableHeader = ['Name', 'Surname', 'Date of birth', 'Fiscal Code', 'Email', 'Customer Id'];

    this.userService.getUsers().subscribe({
      next: users => {
        this.usersList = users;
        this.currentPage = users.length > 0 ? 1 : 0;
        this.currentPages = this.tableConfigService.getCurrentPages(users.length);
        this.dataSize = Math.floor(users.length/10);
      },
      error: err => {
        this.errorMessage = err.error.error;
      }
    });

  }

  mapping(user: User): Map<any,any> {
    const mapObj = new Map();
    mapObj.set('name', user.name);
    mapObj.set('surname', user.surname);
    mapObj.set('birthDate', user.birthDate);
    mapObj.set('cf', user.cf);
    mapObj.set('email', user.email);
    mapObj.set('idUser', user.idUser);

    return mapObj;

  }

  /**
   * function to normal key property order for keyvalue pipe
   */
  returnZero(): number {
    return 0
  }

}
