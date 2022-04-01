import {Actions} from "./Actions";

/**
 * User entity of the DB
 */
export interface User{
  idUser?: number;
  name: string;
  surname: string;
  cf: string;
  birthDate: string;
  role: string;
  email: string;
  password: string;
  actions: Actions[];
}
