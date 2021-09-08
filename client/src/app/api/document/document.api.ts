import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDocument, Document } from 'src/app/models/document.model';
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
   * @param user_id user id
   * @param doc_id document id
   * @returns the document data of a certain user
   */
  getDocument(user_id: string, doc_id: string): Observable<IDocument> {
    return this.http.get<IDocument>(`${this.api}/${user_id}/${doc_id}`);
  }
}
