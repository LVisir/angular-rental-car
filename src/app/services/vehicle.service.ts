import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Vehicle} from "../../interfaces/Vehicle";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': `LoginToken ${sessionStorage.getItem('tokenJWT')}`
  }),
};

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private apiUrl = 'http://localhost:8091/vehicles';

  constructor(private http:HttpClient) { }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl, httpOptions);
  }

  getVehicle(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(this.apiUrl+`/${id}`, httpOptions);
  }

  updateVehicle(vehicle: Vehicle, id: number) {
    return this.http.put<Vehicle>(this.apiUrl+`/update/${id}`, vehicle, httpOptions);
  }

  deleteVehicle(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+`/delete/${id}`, httpOptions);
  }

  insertVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl+`/add`, vehicle, httpOptions);
  }

  getLastBookingDateOfVehicle(idBooking: number, idCustomer: number): Observable<any> {
    return this.http.get(this.apiUrl+`/lastBooking?booking=${idBooking}&customer=${idCustomer}`)
  }

  searchVehiclesBy(field: String, value: String): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl+`/search?field=${field}&value=${value}`, httpOptions);
  }

}
