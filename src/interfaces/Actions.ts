/**
 * name: name of the action; ex: Add, Delete, Update, ecc
 * type: if it is an action on place or a navigation to another place
 * execute: the action that should be executed
 * color: the color of the button to give to this action
 * disable: param to enable/disable the button of this action
 */
export interface Actions {

  name?: string;
  type?: string;

  execute?: (obj: any) => void;

  color?: string;
  disable?: boolean;

}
