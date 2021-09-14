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
  private fixationArea$ = new BehaviorSubject<IFixationArea>(
                                            new FixationArea(8, 14));
  private fixationLeftMargin$  = new BehaviorSubject<number>(8);
  private fixationRightMargin$ = new BehaviorSubject<number>(14);


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
   * @returns left margin of the fixation area
   */
  getFixationLeftMargin$(): Observable<number> {
    return this.fixationLeftMargin$.asObservable();
  }

  /**
   * @returns right margin of the fixation area
   */
  getFixationRightMargin$(): Observable<number> {
    return this.fixationRightMargin$.asObservable();
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
  
  /**
   * Sets the new left margin of the fixation area.
   * @param fixationleftMargin new left margin of the fixation area
   */
  setFixationLeftMargin(fixationleftMargin: number) {
    this.fixationLeftMargin$.next(fixationleftMargin);
  }

  /**
   * Sets the new right margin of the fixation area.
   * @param fixationRightMargin new right margin of the fixation area
   */
  setFixationRightMargin(fixationRightMargin: number) {
    this.fixationRightMargin$.next(fixationRightMargin);
  }
  
}
