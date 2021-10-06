import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  SUCCESS_CONF: MatSnackBarConfig = {
    panelClass: ['success'],
    duration: 2000
  }; 
  
  ERROR_CONF: MatSnackBarConfig = {
    panelClass: ['error'],
    duration: 4000
  };

  constructor(public snackBar: MatSnackBar) { }
  
  /**
   * Shows a success notification.
   * @param msg message to be displayed
   */
  showSuccess(msg: string): void {
    this.snackBar.open(msg, 'x', this.SUCCESS_CONF);
  }

  /**
   * Shows an error success.
   * @param msg message to be displayed
   */
  showError(msg: string): void {
    // The second parameter is the text in the button. 
    // In the third, we send in the css class for the snack bar.
    this.snackBar.open(msg, 'x', this.ERROR_CONF);
  }

}
