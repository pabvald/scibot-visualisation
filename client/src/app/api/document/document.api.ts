import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { first, shareReplay, take, map} from 'rxjs/operators';
import { Document, IDocumentFeatures, IDocumentLayout, IDocumentFixation, IDocumentRelevance } from 'src/app/models/document.model';
import { IFixationArea } from 'src/app/models/fixation-area.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DocumentApi {

  readonly api = `${environment.API_URL}/document`;

  constructor(private http: HttpClient) { }

  /**
   * @returns all the user ids
   */ 
  getIds(): Observable<string[]> {
    return this.http.get<string[]>(`${this.api}/ids`);
  }

  /**
   * 
   * @param userID user id
   * @param docId document id
   * @param fixationArea fixation area description
   * @returns the document data of a certain user
   */
  getDocument(userId: string, docId: string, 
              fixationArea: IFixationArea | undefined): Observable<Document> {
    return forkJoin([      
      this.getDocLayout(userId, docId),
      this.getDocFeatures(userId, docId),
      this.getDocRelevance(userId, docId),
      this.getDocFixation(userId, docId, fixationArea)
    ]).pipe(map(([layout, features, relevance, fixation]) => {
      return  new Document(layout, features, relevance, fixation);
    }))
  }

  /**
   * 
   * @param userID user id
   * @param docId document id
   * @returns 
   */
  getDocLayout(userId: string, docId: string): Observable<IDocumentLayout> {
    return this.http.get<IDocumentLayout>(`${this.api}/layout/${userId}/${docId}`);
  }

  /**
   * 
   * @param userID user id
   * @param docId document id
   * @returns 
   */
   getDocFeatures(userId: string, docId: string): Observable<IDocumentFeatures> {
    return this.http.get<IDocumentFeatures>(`${this.api}/features/${userId}/${docId}`);
  }

  /**
   * 
   * @param userID user id
   * @param docId document id
   * @returns 
   */
   getDocRelevance(userId: string, docId: string): Observable<IDocumentRelevance> {
    return this.http.get<IDocumentRelevance>(`${this.api}/relevance/${userId}/${docId}`);
  }

  /**
   * 
   * @param userID user id
   * @param docId document id
   * @param fixationArea fixation area description
   * @returns 
   */
   getDocFixation(userId: string, docId: string, fixationArea: IFixationArea | undefined): Observable<IDocumentFixation> {
    let httpParams = new HttpParams()
    
    if (fixationArea) {
      Object.keys(fixationArea).forEach(key => {
          httpParams = httpParams.append(key, fixationArea[key as keyof IFixationArea]);
        });
    }
    return this.http.get<IDocumentFixation>(`${this.api}/fixation/${userId}/${docId}`, {params: httpParams})
  }

}
