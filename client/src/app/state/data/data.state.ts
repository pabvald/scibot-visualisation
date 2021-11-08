import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { FixationArea, IFixationArea } from 'src/app/models/fixation-area.model';
import { Document, IDocumentFeatures, IDocumentFixation, IDocumentLayout, IDocumentRelevance } from '../../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DataState {

  private updating$ = new BehaviorSubject<boolean>(false);
  private documentLayout$ = new ReplaySubject<IDocumentLayout>();
  private documentFeatures$ = new ReplaySubject<IDocumentFeatures>();
  private documentRelevance$ = new ReplaySubject<IDocumentRelevance>();
  private documentFixation$ = new ReplaySubject<IDocumentFixation>();
  private document$ = new ReplaySubject<Document>();
  private fixationArea$ = new BehaviorSubject<IFixationArea>(new FixationArea(0, 0));

  /**
   * @returns the app state is being updated (`true`) or not (`false`)
   */
  isUpdating$(): Observable<boolean> {
    return this.updating$.asObservable();
  }

  /**
   * @returns current document's layout
   */
  getDocLayout$(): Observable<IDocumentLayout> {
    return this.documentLayout$.asObservable();
  }

  /**
   * @returns current document's features
   */
   getDocFeatures$(): Observable<IDocumentFeatures> {
    return this.documentFeatures$.asObservable();
  }

  /**
   * @returns current document's relevance
   */
   getDocRelevance$(): Observable<IDocumentRelevance> {
    return this.documentRelevance$.asObservable();
  }

  /**
   * @returns current document's fixation times
   */
   getDocFixation$(): Observable<IDocumentFixation> {
    return this.documentFixation$.asObservable();
  }

  /**
   * @returns current document
   */
  getDocument$(): Observable<Document> {
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
   * Sets the new document's layout
   * @param docLayout document's layout
   */
  setDocLayout(docLayout: IDocumentLayout){
    return this.documentLayout$.next(docLayout);
  }

  /**
   * Sets the new document's paragraph features
   * @param docFeatures document's paragraph features
   */
  setDocFeatures(docFeatures: IDocumentFeatures) {
    return this.documentFeatures$.next(docFeatures); 
  }

  /**
   * Sets the new document's paragraph relevance
   * @param docRelevance document's paragraph relevance
   */
  setDocRelevance(docRelevance: IDocumentRelevance) {
    return this.documentRelevance$.next(docRelevance);
  }

  /**
   * Sets the new document's fixation times
   * @param docFixation document's fixation times per token
   */
  setDocFixation(docFixation: IDocumentFixation) {
    return this.documentFixation$.next(docFixation)
  }

  /**
   * Sets the new document.
   * @param doc new document
   */
  setDocument(doc: Document) {
    this.document$.next(doc);
  }

  /**
   * Sets the new fixation area.
   * @param fixationArea new fixation area configuration
   */
  setFixationArea(fixationArea: IFixationArea) {
    this.fixationArea$.next(fixationArea);
  }
    
}
