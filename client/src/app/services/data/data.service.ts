import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/config';
import { Article } from 'src/app/models/article';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private http: HttpClient) { }

  /**
   * Gets a certain article.
   * @param group 'g-REL' or 'Google_NQ'
   * @param id article id
   * @returns article 
   */
  getArticle(group: string, id: string): Observable<Article> {

    let req = this.http.get<Article>(`${BASE_URL}/article/${group}/${id}`);
    return req;
  }

}
