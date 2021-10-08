import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { catchError, map, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationsService } from "../notifications/notifications.service";
 
@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {
 
  constructor(
    private router: Router, 
    private notificationsService: NotificationsService) {
  }
  
  /**
   * Intercepts and processes every HTTP error.
   * @param req HTTP request
   * @param next HTTP handler
   * @returns 
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    return next.handle(req).pipe(
      retry(1),
      catchError((error) => {
 
        let handled: boolean = false;
        console.error(error);
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error("Error Event");
          } else {
            console.log(`error status : ${error.status} ${error.statusText}`);
            switch (error.status) {
              case 0:
                handled = true;
                this.notificationsService.showError("The connection to the server cannot be established.");
                break;
              case 404: 
                this.notificationsService.showError("The solicited data is not currently available.");
                break;
              case 500:
                this.notificationsService.showError("An internal server error has ocurred. Try again later.");
                break
            }
          }
        }
        else {
          console.error("Other Errors");
        }
 
        if (handled) {
          // return back
          return of(error);
        } else {
          // throw error back to the subscriber
          return throwError(error);
        }
 
      })
    )
  }
}