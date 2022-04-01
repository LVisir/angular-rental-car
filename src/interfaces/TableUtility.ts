import {HeaderTableDatabase} from "./HeaderTableDatabase";

export interface TableUtility<T> {

  // contains the name of the column of the T entity in the DB
  tableDbHeader: HeaderTableDatabase[];

  /**
   * Contains the mapping between the column DB name of the entity T and his value
   * @param object of type T
   */
  mapping(object: T): Map<any, any>;

  /**
   * Bind the CRUD actions or custom actions to the array of entities T
   * @param object of type T
   */
  attachActions(object: T[]): void;

  delete(id: number): void;

  updateList(id: number): void;

  /**
   * Method to navigate and bring a value in the url
   * @param id: value to bring in the url
   */
  move(id: number): void;

  search(field: string, value: string): void;

  // reset all settings of the table to the origin
  reset(): void;

}
