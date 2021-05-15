import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoginIn = false;
  user = null;

  constructor(
    public loginService:LoginService,
    ) { }

  ngOnInit(): void {
    this.isLoginIn = this.loginService.isLoginIn();
    this.user = this.loginService.getUser();
    this.loginService.loginStatusSubject.asObservable().subscribe(
      (data)=>{
        this.isLoginIn = this.loginService.isLoginIn();
        this.user = this.loginService.getUser();
      })

  }

  /**
   * logout
   */
  public logout() {
    this.loginService.logout();
    // this.isLoginIn = false;
    // this.user = null;
    window.location.reload();
//    this.loginService.loginStatusSubject(false)
  }
}
