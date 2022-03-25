import {Vehicle} from "./Vehicle";
import {User} from "./User";
import {Actions} from "./Actions";

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
  actions: Actions[];
}
