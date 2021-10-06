import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor() { 
  }
  
  /**
   * Handles an error.
   * @param error any error
   */
  handleError(error: Error) {
    console.error('An error occurred:', error.message);
  }  
}