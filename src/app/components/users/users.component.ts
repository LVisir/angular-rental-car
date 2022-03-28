import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../../interfaces/User';
import {TableUtility} from "../../../interfaces/TableUtility";
import {TableTools} from "../../../classes/TableTools";
import {HeaderTableDatabase} from "../../../interfaces/HeaderTableDatabase";
import {Actions} from "../../../interfaces/Actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends TableTools<User> implements OnInit, TableUtility<User> {

  constructor(private userService: UserService, private router: Router) {
    super();
  }

  ngOnInit(): void {

    this.dbHeader = ['name', 'surname', 'birthDate', 'cf', 'email', 'idUser']

    this.userService.getUsers().subscribe({
      next: users => {
        this.attachActions(users);
        this.currentPage = users.length > 0 ? 1 : 0;
        this.currentPages = this.getCurrentPages(users.length);
        this.dataSize = Math.floor(users.length / 10);
      },
      error: err => {
        this.errorMessage = err.error.error;
      }
    });

  }

  mapping(user: User): Map<any, any> {
    const mapObj = new Map();
    mapObj.set('name', user.name);
    mapObj.set('surname', user.surname);
    mapObj.set('birthDate', user.birthDate);
    mapObj.set('cf', user.cf);
    mapObj.set('email', user.email);
    mapObj.set('idUser', user.idUser);

    return mapObj;
  }

  tableDbHeader: HeaderTableDatabase[] = [
    {
      headerTable: 'Name',
      headerDb: ['name'],
      state: 0,
      sortable: true
    },
    {
      headerTable: 'Surname',
      headerDb: ['surname'],
      state: 0,
      sortable: true
    },
    {
      headerTable: 'Date of birth',
      headerDb: ['birthDate'],
      state: 0,
      sortable: true
    },
    {
      headerTable: 'Fiscal Code',
      headerDb: ['cf'],
      state: 0,
      sortable: true
    },
    {
      headerTable: 'Email',
      headerDb: ['email'],
      state: 0,
      sortable: true
    },
    {
      headerTable: 'Customer Id',
      headerDb: ['idUser'],
      state: 0,
      sortable: true
    },
  ]

  attachActions(object: User[]): void {

    const deleteUser = (id: number) => {
      this.delete(id)
    }

    const updateUsersList = (id: number) => {
      this.updateList(id)
    }

    const moveToUpdatePage = (id: number) => {
      this.move(id)
    }

    let action2 = this.action = {
      name: 'Delete',
      execute(obj: User) {
        if (obj.idUser !== undefined) {
          deleteUser(obj.idUser)
          updateUsersList(obj.idUser)
        }
      },
      type: 'OnPlace'
    }

    let action3 = this.action = {
      name: 'Edit',
      execute(obj: User) {
        if (obj.idUser !== undefined) {
          moveToUpdatePage(obj.idUser)
        }
      },
      type: 'Move'
    }

    let actions: Actions[] = [
      {...action2}, {...action3}
    ]

    object.map(x => {
      this.list.push({...x, actions: actions})
    })

    this.totalActions = actions.length

  }

  delete(id: number): void {
    this.userService.deleteUser(id).subscribe({
      error: err => console.log(err)
    })
  }

  updateList(id: number): void {
    this.list = this.list.filter(x => {
      return x.idUser !== id && x
    })
  }

  move(id: number): void {
    this.router.navigate(['/users/update-user', id])
  }

}
