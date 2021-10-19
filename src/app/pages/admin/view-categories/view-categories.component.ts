import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  cid;
  categories=[];

  constructor(private _categories:CategoryService,    
    private _snack:MatSnackBar
    ) { }

  ngOnInit(): void {

    this._categories.categories().subscribe((data:any)=>{
      this.categories=data;
      console.log(this.categories);
      this.cid = data.cid;
    },(error)=>{
      console.log(error);
      Swal.fire('Error !!','error in loading data','error');
    })

  }
  deleteCategory(cid){
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure, want to delete this Category',
    }).then((result)=>{
      this._categories.deleteCategory(cid).subscribe((data:any)=>{
        console.log("Successfully..del",data);
        this._snack.open('Category deleted','',{
          duration:3000
        })
       // this.categories = this.categories.filter((c)=>{c.categories.cid != cid})
      },(error)=>{
        console.log(error);
        this._snack.open('Error in deleting Category','',{
          duration:3000
        })
      })
    })
  
  }

   
}
