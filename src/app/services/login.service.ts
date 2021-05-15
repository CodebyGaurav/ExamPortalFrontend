import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  /**
   * getCurrentUser which is login
   */
  public getCurrentUser() {
    return this.http.get(`${environment.baseUrl}/current-user`)
  }

  //generate token
  public generateToken(loginData: any) {
    
    return this.http.post(`${environment.baseUrl}/generate-token`, loginData)

  }


  //login user : set token in local storage
  public loginUser(token) {
    localStorage.setItem('token', token)
    
    return true;
  }

  //islogin: user is login or not
  public isLoginIn() {
    let tokenStr = localStorage.getItem('token')
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false
    } else {
      return true
    }
  }


  /**
   * //logout :  remove token from local storage
   */
  public logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return true;
  }


  /**
   * get token
   */
  public getToken() {
    return localStorage.getItem('token')
  }

  /**
   * set UserDetails
   */
  public setUserDetails(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * getUser
   */
  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr)
    } else {
      this.logout();
      return null;
    }
  }

  /**
   * getUserRole
   */
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }



}
