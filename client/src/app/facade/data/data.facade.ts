import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { first, shareReplay, take } from 'rxjs/operators';
import { FixationArea, IFixationArea } from 'src/app/models/fixation-area.model';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { DocumentApi } from '../../api/document/document.api';
import { UserApi } from '../../api/user/user.api';
import { Document } from '../../models/document.model';
import { DataState } from '../../state/data/data.state';

@Injectable({
  providedIn: 'root'
})
export class DataFacade {

  private userIds$: Observable<string[]>;
  private documentIds$: Observable<string[]>;
  private document$: Observable<Document>;
  private fixationArea$: Observable<FixationArea>;

  constructor(    
    private userApi: UserApi,
    private dataState: DataState,
    private documentApi: DocumentApi,
    private notificationService: NotificationsService) { 
      
      this.document$ = this.dataState.getDocument$();
      this.fixationArea$ = this.dataState.getFixationArea$();
      this.userIds$ = this.userApi.getIds().pipe(shareReplay(1));
      this.documentIds$ = this.documentApi.getIds().pipe(shareReplay(1));      
      this.initializeDataState();
  }

  /**
   *  Initialize the data state.
   */
  initializeDataState() {
    let docId = "";
    let userId = "";
    this.dataState.setUpdating(true);

    combineLatest([this.userIds$, this.documentIds$])
      .pipe(first())
      .subscribe( 
        ([userIds, documentIds]) => {            
            docId = documentIds[0];
            userId = userIds[0];
            this.loadDocument(userId, docId);
          },
        (error) => { 
          console.log(error); 
          this.dataState.setUpdating(false);
        }
      )
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
  getDocument$(): Observable<Document> {
    return this.document$;
  }

  getFixationArea$(): Observable<FixationArea> {
    return this.fixationArea$;
  }

  /**
   * Reloads the current document.
   */
  reloadDocument() {
    let userId: string = ""; 
    let docId: string = "";
    this.dataState.getDocument$().pipe(take(1)).subscribe(document => {
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
    this.dataState.getFixationArea$().pipe(take(1)).subscribe((data) => {fixationArea = data});

    combineLatest([
      this.documentApi.getDocLayout(userId, docId),
      this.documentApi.getDocFeatures(userId, docId),
      this.documentApi.getDocRelevance(userId, docId),
      this.documentApi.getDocFixation(userId, docId, fixationArea)
    ]).pipe(
      first(),
    ).subscribe(
      (results) => {
        this.dataState.setDocLayout(results[0]);
        this.dataState.setDocFeatures(results[1]);
        this.dataState.setDocRelevance(results[2]);
        this.dataState.setDocFixation(results[3]);
        this.dataState.setDocument(new Document(results[0], results[1], results[2], results[3]));
      },
      (error) => {
        console.log(error);
      },
      () => { 
        this.notificationService.showSuccess("Data loaded"); 
      }
    ).add(
      () => { this.dataState.setUpdating(false); }
    )
  }

  /**
   * Sets the fixation area and reloads the current document's fixation times considering the new fixation
   * area configuration.
   * @param fixationArea new fixation area
   */
  setFixationArea(fixationArea: IFixationArea) {
    let userId: string = ""; 
    let docId: string = "";
    
    this.dataState.setUpdating(true);
    this.dataState.setFixationArea(fixationArea);
    this.dataState.getDocument$().pipe(take(1)).subscribe(document => {
      userId = document.userId;
      docId = document.id;
    });    

    combineLatest([
      this.dataState.getDocLayout$(),
      this.dataState.getDocFeatures$(),
      this.dataState.getDocRelevance$(),
      this.documentApi.getDocFixation(userId, docId, fixationArea)
    ]).pipe(
      first()
    ).subscribe(
      (results) => {
        this.dataState.setDocFixation(results[3]);
        this.dataState.setDocument(new Document(results[0], results[1], results[2], results[3]));
      },
      (error) => {
        console.log(error);
      },
      () => { 
        this.notificationService.showSuccess("Data loaded"); 
      }
    ).add(
      () => { this.dataState.setUpdating(false); }
    )
  }

}
