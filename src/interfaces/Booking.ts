import {Vehicle} from "./Vehicle";
import {User} from "./User";
import {Actions} from "./Actions";

/**
 * Booking entity of the DB
 */
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
