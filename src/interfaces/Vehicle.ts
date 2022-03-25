import {Actions} from "./Actions";

export interface Vehicle{
  idVehicle?: number;
  licensePlate: string;
  manufacturer: string;
  model: string;
  registrYear: string;
  typology: string;
  actions: Actions[];
}
