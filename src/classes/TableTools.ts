export class TableTools<T> {

  currentPages: number[] = [];
  currentPage!: number;
  list: T[] = [];
  dbHeader: string[] = [];
  errorMessage: string = '';
  dataSize!: number;

  shiftOrder(state: number): number {
    return (state+1)%3;
  }

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
