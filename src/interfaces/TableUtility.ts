import {HeaderTableDatabase} from "./HeaderTableDatabase";

export interface TableUtility<T> {

  tableDbHeader: HeaderTableDatabase[];

  mapping(object: T): Map<any, any>;

  attachActions(object: T[]): void;

}
