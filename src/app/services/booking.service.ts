import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Booking} from "../../interfaces/Booking";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = 'http://localhost:8091/bookings';

  constructor(private http: HttpClient) {
  }

  getBookings(): Observable<Booking[]> {

    if (sessionStorage.getItem('customer') !== null) {
      return this.http.get<Booking[]>(this.apiUrl + '/customers' + `/email/${sessionStorage.getItem('customer')}`);
    } else {
      return this.http.get<Booking[]>(this.apiUrl);
    }

  }

  getBooking(id: number): Observable<Booking> {
    return this.http.get<Booking>(this.apiUrl + `/${id}`);
  }

  insertBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl + `/add`, booking);
  }

  updateBooking(booking: Booking, id: number): Observable<Booking> {
    return this.http.put<Booking>(this.apiUrl + `/update/${id}`, booking);
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + `/delete/${id}`);
  }

  getBookingOfUser(id: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl + `/customers/${id}`);
  }

  searchBookingsBy(field: String, value: String): Observable<Booking[]> {

    if(sessionStorage.getItem('customer') !== null){
      return this.http.get<Booking[]>(this.apiUrl+'/customers'+`/${sessionStorage.getItem('userId')}` + `/search?field=${field}&value=${value}`);
    }
    return this.http.get<Booking[]>(this.apiUrl + `/search?field=${field}&value=${value}`);
  }

}
