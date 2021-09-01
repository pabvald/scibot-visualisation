import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE } from '../config';

@Injectable({
  providedIn: 'root'
})
export class UserApi {

  readonly api = `${API_BASE}/user`;

  constructor(private http: HttpClient) { }

  /**
   * @returns all the user ids
   */
  getIds(): Observable<string[]> {
    return this.http.get<string[]>(`${this.api}/ids`);
  }
  
}
