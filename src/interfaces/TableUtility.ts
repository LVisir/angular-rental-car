import {HeaderTableDatabase} from "./HeaderTableDatabase";

export interface TableUtility<T> {

  tableDbHeader: HeaderTableDatabase[];

  mapping(object: T): Map<any, any>;

  attachActions(object: T[]): void;

  delete(id: number): void;

  updateList(id: number): void;

  move(id: number): void;

  search(field: string, value: string): void;

  reset(): void;

}
