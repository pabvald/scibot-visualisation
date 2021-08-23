import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Greeting } from 'src/app/models/greeting';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelloWorldService {
  base = "http://localhost:5002";

  constructor(private http: HttpClient) { }

  /**
   * Get hello world
   * @returns greetings
   */
  getGreetings(): Observable<Greeting[]> {
    let req = this.http.get<Greeting[]>(`${this.base}/hello-world`);
    return req;
  }
}
