import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }

  /**
   * quizzes
   */
  public quizzes() {

    return this._http.get(`${environment.baseUrl}/quiz/`);
  }
}
