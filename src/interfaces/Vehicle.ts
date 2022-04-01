import {Actions} from "./Actions";

/**
 * Vehicle entity of the DB
 */
export interface Vehicle{
  idVehicle?: number;
  licensePlate: string;
  manufacturer: string;
  model: string;
  registrYear: string;
  typology: string;
  actions: Actions[];
}
