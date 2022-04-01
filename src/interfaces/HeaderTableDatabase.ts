/**
 * Object in which the table should check to adapt to:
 * - headerTable: header name of the table column
 * - headerDb: DB table column name; it is an array for column name of the nested element
 * - state: state that indicates which sort must be applied: [0,1,2] -> [no_sort, ascending, descending]
 * - sortable: to tell if this field is sortable
 */
export interface HeaderTableDatabase {

  headerTable: string;
  headerDb: string[];
  state?: number;
  sortable: boolean;

}
