import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid;
  questions;

  constructor(
    private _locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionService,
  ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params.qid;
    console.log(this.qid);
    this.loadQuestions();
    
  }
  loadQuestions() {
    this._question.getQuestionsofQuizForTest(this.qid).subscribe(
      (data:any)=>{
        console.log(data);
        this.questions = data;
      },(error)=>{
        console.log(error);
        Swal.fire('Error','Error in loading question of quiz','error')
      }
    )
  }

  preventBackButton(){
    history.pushState(null,null, location.href);
    this._locationSt.onPopState(()=>{
      history.pushState(null,null,location.href);
    })
  }

}
