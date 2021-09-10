import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentApi } from '../../api/document/document.api';
import { UserApi } from '../../api/user/user.api';
import { IDocument } from '../../models/document.model';
import { DataState } from '../../state/data/data.state';

@Injectable({
  providedIn: 'root'
})
export class DataFacade {

  private userIds$: Observable<string[]>;
  private documentIds$: Observable<string[]>;
  private document$: Observable<IDocument>;

  constructor(
    private documentApi: DocumentApi,
    private userApi: UserApi,
    private dataState: DataState) { 
      
      this.userIds$ = this.userApi.getIds();
      this.documentIds$ = this.documentApi.getIds();
      this.document$ = this.dataState.getDocument$();
      
    }
  
  /** The data state is being updated */
  isUpdating$(): Observable<boolean> {
    return this.dataState.isUpdating$();
  }

  /**
   * @returns all possible user ids
   */
  getUserIds$(): Observable<string[]> {
    return this.userIds$;
  }

  /**
   * @returns all possible document ids
   */
  getDocumentIds$(): Observable<string[]> {
    return this.documentIds$;
  }

  /**
   * @returns loaded document
   */
  getDocument$(): Observable<IDocument> {
    return this.document$;
  }

  /**
   * Loads a document.
   * @param user_id user id
   * @param doc_id document id
   */
  loadDocument(user_id: string, doc_id: string) {
    this.dataState.setUpdating(true);
    this.documentApi.getDocument(user_id, doc_id)
      .subscribe(
        (document) => this.dataState.setDocument(document),
        (error) => console.log(error),
        () => this.dataState.setUpdating(false)
      );
  }

}
