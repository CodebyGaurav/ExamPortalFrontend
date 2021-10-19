import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient) { }

  /**
    //load all categories
   */
  public categories() {
  //baseUrl:'http://localhost:9090'
  return this._http.get(`${environment.baseUrl}/category/`);
  }

  /**
   * addCategory
   */
  public addCategory(category) {
   return this._http.post(`${environment.baseUrl}/category/`,category); 
  }

  /**
   * deleteCategory
   */
  public deleteCategory(categoryId) {
    return this._http.delete(`${environment.baseUrl}/category/${categoryId}`)
    
  }
}
