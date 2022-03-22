export class TableFieldInfo {

  field!: string;
  header!: string;
  sortable!: boolean;
  sortType!: string;

  constructor(field: string, header: string, sortable: boolean, sortType: string) {
    this.field = field;
    this.header = header;
    this.sortable = sortable;
    this.sortType = sortType;
  }

}
