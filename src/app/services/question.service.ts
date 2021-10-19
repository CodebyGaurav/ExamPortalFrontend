import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  /**
   * getQuestionsofQuiz
   */
  public getQuestionsofQuiz(qId) {
    return this._http.get(`${environment.baseUrl}/question/quiz/all/${qId}`)
  }

  /**
   * getQuestionsofQuizForTest
   */
   public getQuestionsofQuizForTest(qId) {
    return this._http.get(`${environment.baseUrl}/question/quiz/${qId}`)
  }

  /**
   * addQuestion
   */
  public addQuestion(question) {
    return this._http.post(`${environment.baseUrl}/question/`,question);
  }


  /**
   * deleteQuestion
   */
  public deleteQuestion(questionId) {
    return this._http.delete(`${environment.baseUrl}/question/${questionId}`)
  }


  /**
   * evalQuiz
   */
  public evalQuiz(questions) {
    return this._http.post(`${environment.baseUrl}/question/eval-quiz`,questions)
  }

}
