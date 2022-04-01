import {Actions} from "../interfaces/Actions";

/**
 * currentPages: array of number representing the page
 * currentPage: number representing the current page
 * list: array of type T
 * dbHeader: name of the column in the DB of the entity T
 * errorMessage: error from the Back-End
 * dataSize: to build the table with pagination
 * action: actions bound with every entity T
 * totalActions: total number of actions bound on every entity T
 * addPagePath: path to the add page
 */
export class TableTools<T> {

  sessionStorage = sessionStorage

  currentPages: number[] = [];
  currentPage!: number;
  list: T[] = [];
  dbHeader: string[] = [];
  errorMessage: string = '';
  dataSize!: number;
  action: Actions = {};
  totalActions!: number;
  addPagePath!: string;

  /**
   * setter for errorMessage
   * @param message
   */
  setErrorMessage(message: string) {
    this.errorMessage = message
  }

  /**
   * State of sort: [0,1,2] -> [no_sort, ascending, descending] respectively
   * @param state
   */
  shiftOrder(state: number): number {
    return (state+1)%3;
  }

  /**
   * Function to handle the changing page by update all the settings for the pagination
   * @param page
   * @param currentPages
   * @param currentPage
   */
  forward(page: number, currentPages: number[], currentPage: number): void {

    page+=1;

    let tmpCurrentPages = currentPages

    // establishes when the pages must shift forward
    if(currentPages[currentPages.length-1] <= currentPage){
      tmpCurrentPages.forEach((value, index) => tmpCurrentPages[index] = value + 1)
    }

    this.currentPage = page;
    this.currentPages = tmpCurrentPages;

  }

  /**
   * Function to handle the changing page by update all the settings for the pagination
   * @param page
   * @param currentPages
   * @param currentPage
   */
  backward(page: number, currentPages: number[], currentPage: number): void {

    page-=1

    let tmpCurrentPages =  currentPages

    // establishes when the pages must shift backward
    if(currentPages[0] >= currentPage){

      tmpCurrentPages.forEach((value, index) => tmpCurrentPages[index] = value - 1)

    }

    this.currentPage = page;
    this.currentPages = tmpCurrentPages;

  }

  /**
   * Function to handle the changing page by update all the settings for the pagination
   * @param newPage
   */
  changePage(newPage: number): void {
    this.currentPage = newPage;
  }

  /**
   * function to normal key property order for keyvalue pipe
   */
  returnZero(): number {
    return 0
  }

  /**
   * function to obtain the proper current pages (max length: 3)
   * @param size
   */
  getCurrentPages(size: number): number[] {
    let pages = [1,2,3]

    if(size > 0){
      let nPages = Math.floor(size/10)

      if(nPages<3){
        if(nPages<2){
          pages = [1]
        }
        else pages = [2]
      }
    }
    else {
      pages = []
    }

    return pages
  }

  /**
   * sort method to sort the list in the table
   * @param arr
   * @param keyArr
   * @param reverse
   */
  sort(arr: any[], keyArr: string[], reverse: boolean): any[] {
    let sortOrder = 1;
    if(reverse)sortOrder = -1;
    return arr.sort(function(a, b) {
      let x=a,y=b;
      for (let i=0; i < keyArr.length; i++) {
        x = x[keyArr[i]];
        y = y[keyArr[i]];
      }
      return sortOrder * ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

}
