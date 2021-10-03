import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDocument, Document } from 'src/app/models/document.model';
import { IFixationArea } from 'src/app/models/fixation-area.model';
import { API_BASE } from '../config';

@Injectable({
  providedIn: 'root'
})
export class DocumentApi {

  readonly api = `${API_BASE}/document`;

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
  getDocument(userID: string, docId: string, 
              fixationArea: IFixationArea | undefined): Observable<IDocument> {
    let httpParams = new HttpParams()
    
    if (fixationArea) {
      Object.keys(fixationArea).forEach(key => {
          httpParams = httpParams.append(key, fixationArea[key as keyof IFixationArea]);
        });
    }
    return this.http.get<IDocument>(`${this.api}/${userID}/${docId}`, {params: httpParams});
  }
}
