import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { FixationArea, IFixationArea } from 'src/app/models/fixation-area.model';
import { IDocument } from '../../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DataState {

  private updating$ = new BehaviorSubject<boolean>(true);
  private document$ = new ReplaySubject<IDocument>();
  private fixationArea$ = new BehaviorSubject<IFixationArea>(new FixationArea(3, 14));


  constructor() { }

  /**
   * @returns the app state is being updated (`true`) or not (`false`)
   */
  isUpdating$(): Observable<boolean> {
    return this.updating$.asObservable();
  }

  /**
   * @returns current document
   */
  getDocument$(): Observable<IDocument> {
    return this.document$.asObservable();
  }

  getFixationArea$(): Observable<IFixationArea> {
    return this.fixationArea$.asObservable();
  }

  /**
   * @param isUpdating `true` if the state has been updated, `false` if the state 
   * is going to be updated
   */
  setUpdating(isUpdating: boolean) {
    this.updating$.next(isUpdating);
  }

  /**
   * Sets the new document.
   * @param doc new document
   */
  setDocument(doc: IDocument) {
    this.document$.next(doc);
  }

  setFixationArea(fixationArea: IFixationArea) {
    this.fixationArea$.next(fixationArea);
  }
    
}
