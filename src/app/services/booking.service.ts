import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Booking} from "../../interfaces/Booking";
import {UserService} from "./user.service";
import {User} from '../../interfaces/User'

/*`LoginToken ${sessionStorage.getItem('tokenJWT')}`*/

let httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': `LoginToken ${sessionStorage.getItem('tokenJWT')}`
  }),
};

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = 'http://localhost:8091/bookings';

  private apiUrlCustomer = 'http://localhost:8091/bookings/customers' + `/email/${sessionStorage.getItem('customer')}`

  constructor(private http: HttpClient, private userService: UserService) {
  }

  getBookings(): Observable<Booking[]> {
    /*const checkSession = httpOptions.headers.get('Authorization')
    const token = sessionStorage.getItem('tokenJWT')
    if (checkSession !== null && token !== null) {
      if (!checkSession.includes(token)) {
        httpOptions = {
          headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': `LoginToken ${sessionStorage.getItem('tokenJWT')}`
          }),
        };
      }
    }


    console.log(this.apiUrl)*/

    if (sessionStorage.getItem('customer') !== null) {
      return this.http.get<Booking[]>(this.apiUrlCustomer);
    } else {
      return this.http.get<Booking[]>(this.apiUrl);
    }
  }

  getBooking(id: number): Observable<Booking> {
    return this.http.get<Booking>(this.apiUrl + `/${id}`, httpOptions);
  }

  insertBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl + `/add`, booking, httpOptions);
  }

  updateBooking(booking: Booking, id: number): Observable<Booking> {
    return this.http.put<Booking>(this.apiUrl + `/update/${id}`, booking, httpOptions);
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + `/delete/${id}`, httpOptions);
  }

  getBookingOfUser(id: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl + `/customers/${id}`, httpOptions);
  }

  searchBookingsBy(field: String, value: String): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl + `/search?field=${field}&value=${value}`, httpOptions);
  }

}
