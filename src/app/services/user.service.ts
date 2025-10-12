import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { User } from '../../interfaces/User';
import {UserModel} from "../models/user.model";
import jwt_decode from "jwt-decode";

/* `LoginToken ${sessionStorage.getItem('tokenJWT')}` */

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': `LoginToken ${sessionStorage.getItem('tokenJWT')}`
  }),
};

const httpLogin = {
  headers: new HttpHeaders({
    'Content-type': 'application/x-www-form-urlencoded'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:32091/users';

  private _userId?: number;

  private userIdObservable = new BehaviorSubject<any>({
    id: null,
    role: []
  })

  get userId(): number {
    return <number>this._userId;
  }

  set userId(value: number | undefined) {
    this._userId = value;
  }

  getUserObservable() {
    return this.userIdObservable.asObservable()
  }

  setUserObservable(value: any) {
    return this.userIdObservable.next(value)
  }

  constructor(private http:HttpClient) {
    sessionStorage.getItem('tokenJWT') !== null && this.setUserObservable({id: sessionStorage.getItem('userId'), role: this.getUserModel(sessionStorage.getItem('tokenJWT')).roles})
  }

  login(credentials: string): Observable<any> {
    return this.http.post<any>('http://localhost:32091/login', credentials);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, httpOptions);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.apiUrl+`/${id}`, httpOptions);
  }

  getUserByEmail(email: string | null): Observable<User> {
    return this.http.get<User>(this.apiUrl+`/email/${email}`);
  }

  insertUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl+`/addUser`, user, httpOptions);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl+`/deleteUser/${id}`, httpOptions);
  }

  updateUser(user: User, id: number): Observable<User> {
    return this.http.put<User>(this.apiUrl+`/update/${id}`, user, httpOptions);
  }

  searchCustomersBy(field: String, value: String): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl+`/customers/normalSearch?field=${field}&value=${value}`, httpOptions);
  }

  getUserModel(token: any): UserModel {
    return jwt_decode(token) as UserModel
  }

}
