import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserApi {

  readonly api = `${environment.API_URL}/user`;

  constructor(private http: HttpClient) { }

  /**
   * @returns all the user ids
   */
  getIds(): Observable<string[]> {
    return this.http.get<string[]>(`${this.api}/ids`);
  }
  
}
