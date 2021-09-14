import { Injectable } from '@angular/core';
import { Observable, combineLatest} from 'rxjs';
import { first, take} from 'rxjs/operators';
import { IFixationArea } from 'src/app/models/fixation-area.model';
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
      this.initializeDataState();
  }

  /**
   *  Initialize the data state.
   */
  initializeDataState() {
    let docId = "";
    let userId = "";
    combineLatest([this.userIds$, this.documentIds$])
      .pipe(first())
      .subscribe( 
        ([userIds, documentIds]) => {
            docId = documentIds[0];
            userId = userIds[0];
            this.loadDocument(userId, docId);
          },
        (error) => { console.log(error); },
        () => { }
        );
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
   * Reloads the current document.
   */
  reloadDocument() {
    let userId: string = ""; 
    let docId: string = "";
    this.document$.pipe(first()).subscribe(document => {
      userId = document.userId;
      docId = document.id;
    });
    this.loadDocument(userId, docId);
  }

  /**
   * Loads a document.
   * @param userId user id
   * @param docId document id
   */
  loadDocument(userId: string, docId: string) {
    let fixationArea: IFixationArea | undefined;

    this.dataState.setUpdating(true);
    this.dataState.getFixationArea$()
                  .subscribe((data) => {fixationArea = data});
    this.documentApi.getDocument(userId, docId, fixationArea)
      .subscribe(
        (document) => { this.dataState.setDocument(document); },
        (error) => { console.log(error); },
        () => { this.dataState.setUpdating(false); }
      );
  }

}
