import {Vehicle} from "./Vehicle";
import {User} from "./User";

export interface Booking{
  idBooking?: number;
  start: string;
  end: string;
  approval: boolean;
  vehicle: {
    idVehicle: number;
  } | Vehicle;
  user: {
    idUser: number;
  } | User;
}
