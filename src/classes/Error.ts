export abstract class Error {

  error: string[] = []
  validationError: string[] = []

  manageError(err: any){
    if(err.error.error){
      this.error.push(err.error.error)
    }
    else if(err.error.error_validation){
      Object.keys(err.error.error_validation).map(x => this.error.push(err.error.error_validation[x]))
    }
  }

}
