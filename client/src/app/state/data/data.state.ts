import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IDocument } from '../../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DataState {

  
  private updating$ = new BehaviorSubject<boolean>(false);
  private document$ = new Subject<IDocument>();


  constructor() { }

  /**
   * @returns the app state is being updated (`true`) or not (`false`)
   */
  isUpdating$(): Observable<boolean> {
    return this.updating$.asObservable();
  }

  /**
   * @param isUpdating `true` if the state has been updated, `false` if the state 
   * is going to be updated
   */
  setUpdating(isUpdating: boolean) {
    this.updating$.next(isUpdating);
  }

  /**
   * @returns current document
   */
  getDocument$(): Observable<IDocument> {
    return this.document$.asObservable();
  }

  /**
   * Set the new document
   * @param doc new document
   */
  setDocument(doc: IDocument) {
    this.document$.next(doc);
  }
  

}
