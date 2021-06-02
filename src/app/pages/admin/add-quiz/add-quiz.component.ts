import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {


  categories=[]

  quizData = {
    title:'',
    description:'',
    maxMark:'',
    numberOfQuestion:'',
    active:true,
    category:{
      cid:'',
    },
  }

  constructor( private categoryService:CategoryService, private _snack:MatSnackBar, private _quizService:QuizService) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data:any)=>{
        this.categories=data;
       // console.log(this.categories);
        
      },(error)=>{
        console.log(error);
        Swal.fire('Error !!','error in loading data from server','error');
      }
    )
  }

  //add Quiz
  addQuiz(){
    if(this.quizData.title.trim()=='' || this.quizData.title == null){
      this._snack.open('Title Required !!','',{
        duration:3000
      })
      return;
    }
    //call server
    this._quizService.addQuiz(this.quizData).subscribe(
      (data)=>{
        Swal.fire('Success','Quiz is added','success')
        this.quizData = {
          title:'',
          description:'',
          maxMark:'',
          numberOfQuestion:'',
          active:true,
          category:{
            cid:'',
          },
        }
      },(error)=>{
        Swal.fire('Error !!','Error while adding quiz','error');
        
      }
    )
  }
}
