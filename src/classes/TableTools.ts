export class TableTools<T> {

  currentPages: number[] = [];
  currentPage!: number;
  list: T[] = [];
  tableHeader: string[] = [];
  errorMessage: string = '';
  dataSize!: number;

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

  changePage(newPage: number): void {
    this.currentPage = newPage;
  }

  /**
   * function to normal key property order for keyvalue pipe
   */
  returnZero(): number {
    return 0
  }

}
