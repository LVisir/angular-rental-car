import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Booking} from "../../Interfaces/Booking";

const httpOptions = {
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

  constructor(private http:HttpClient) { }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl, httpOptions);
  }

  getBooking(id: number): Observable<Booking> {
    return this.http.get<Booking>(this.apiUrl+`/${id}`, httpOptions);
  }

  insertBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl+`/add`, booking, httpOptions);
  }

  updateBooking(booking: Booking, id: number): Observable<Booking> {
    return this.http.put<Booking>(this.apiUrl+`/update/${id}`, booking, httpOptions);
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl+`/delete/${id}`, httpOptions);
  }

  getBookingOfUser(id: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl+`/customers/${id}`, httpOptions);
  }

  searchBookingsBy(field: String, value: String): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl+`/search?field=${field}&value=${value}`, httpOptions);
  }

}
