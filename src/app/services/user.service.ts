import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  private apiUrl = 'http://localhost:8091/users';

  constructor(private http:HttpClient) { }

  login(credentials: string): Observable<any> {
    return this.http.post<any>('http://localhost:8091/login', credentials);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, httpOptions);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.apiUrl+`/${id}`, httpOptions);
  }

  getUserByEmail(email: string | null, httpHeader: {headers: HttpHeaders}): Observable<User> {
    return this.http.get<User>(this.apiUrl+`/email/${email}`, httpHeader);
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
