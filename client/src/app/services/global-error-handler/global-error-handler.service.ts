import { ErrorHandler, Injectable } from '@angular/core';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private notificationsService: NotificationsService) { 
  }
  
  /**
   * Handles an error.
   * @param error any error
   */
  handleError(error: Error) {
    console.error('An error occurred:', error.message);
    this.notificationsService.showError('Error: ' + error.message);
  }  
}