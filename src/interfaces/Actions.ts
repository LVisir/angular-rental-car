export interface Actions {

  name?: string;
  type?: string;

  execute?(obj: any): void;

}
