import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private userService : UserService,
    private _snackBar: MatSnackBar
    ) { }

  public user = {
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    email:'',
    phone:'',
  }
  
  ngOnInit(): void {  }

  formSubmit(){
    console.log("submit",this.user);
    if(this.user.username==''||this.user.firstname==''){
    //alert('submit');
    this._snackBar.open("Username is required !!",'',{
      duration:3000,
      verticalPosition:'top',
      horizontalPosition:'right'
    });
    return;
    }



  //add user service
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        debugger
        console.log(data);
       // alert('SuccessFully')
       if(data.message !=null){

       Swal.fire('Please check','Already exist : '+data.message,'warning')
       }else{
        Swal.fire('Successfully Registered','You user id : '+data.id,'success')
       }
       

      },(error)=>{
        console.log(error);
        // alert('something went wrong')
        // Swal.fire('something went wrong !!','user is registrated','warning')

        Swal.fire('something went wrong !! or User already exist','',error)
        // this._snackBar.open('something went wrong !!','',{
        //   duration:3000
        // })
      }
    )

  }

}
