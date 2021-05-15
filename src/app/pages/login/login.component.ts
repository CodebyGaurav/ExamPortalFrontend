import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username:'',
    password:'',
  };

  constructor(
    private matSnackBar:MatSnackBar,
    private loginService:LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log('login');
    if(this.loginData.username.trim()==''||this.loginData.username==null){
      this.matSnackBar.open('Username is required !!','',{
        duration:3000,
      });
      return;
    }

    if(this.loginData.password.trim()==''||this.loginData.password==null){
      this.matSnackBar.open('Password is required !!','',{
        duration:3000,
      });
      return;
    }

    //request to server to generate token

    this.loginService.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log('Success');
        Swal.fire('Successfully Login','You username : '+this.loginData.username ,'success')

        console.log(data);
        //login......
        this.loginService.loginUser(data.token);
        
        this.loginService.getCurrentUser().subscribe(
          (user:any)=>{
            this.loginService.setUserDetails(user);
            console.log(user);
            //redirect ....ADMIN : admin dashboard
            //redirect.... NORMAL : normal dashboard
            if (this.loginService.getUserRole()=="ADMIN") {
              //admin dashboard
             // window.location.href='/admin'
              this.router.navigate(['admin'])
              this.loginService.loginStatusSubject.next(true);
            }else if(this.loginService.getUserRole()=="NORMAL"){
              // normal user dashboard 
             // window.location.href='/user-dashboard'
             this.router.navigate(['user-dashboard'])
             this.loginService.loginStatusSubject.next(true);

            }else{
              this.loginService.logout();
            }
          }
        )
        
      },(error)=>{
        console.log('error');
        console.log(error);
        Swal.fire('Invalid Details !! try again','Please enter correct Username and Password','error')
        // this.matSnackBar.open('Invalid Details !! try again','',{
        //   duration:3000
        // })
      }
    )
    

  }
}
