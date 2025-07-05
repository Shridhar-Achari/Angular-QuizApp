import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../service/question.service';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';

@Component({
  selector: 'app-question',
  imports: [CommonModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent implements OnInit {
  constructor(private http: HttpClient, private questionService: QuestionService) {
  }
  
  public name: string = '';
  public questionList: any = '';
  public currQuest: number = 0;
  public points: number = 0;
  counter = 60;
  public correctAns: number = 0;
  public incorrectAns: number = 0;
  public skippedQue: number = 0;
  interval$: any;
  progress: string = '';
  isQuizComplete: boolean = false;
  answerSelected: boolean = false;

  selectedOptionIndex: number | null = null;
  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions() {
    this.questionService.getQuestionJson().subscribe((res: any) => {
      this.questionList = res.questions;
    });
  }

  skipQuest() {
    if (this.currQuest < this.questionList.length - 1) {
      console.log("cur", this.currQuest, "len", this.questionList.length)
      this.currQuest++;
      this.points -= 10;
      this.skippedQue++;
      this.getProgressPercent();

    }
    else {
      this.isQuizComplete = true;
      this.points -= 10;
      this.skippedQue++;
    }
  }
  answer(questno: number, option: any, selectedIndex: number) {
    console.log(questno)
    if (this.answerSelected) return;

    this.answerSelected = true;
    this.selectedOptionIndex = selectedIndex;

    if (option.correct) {
      this.points += 10;
      this.correctAns++;
    } else {
      this.points -= 10;
      this.incorrectAns++;
    }

    setTimeout(() => {
      this.resetCounter();
      this.currQuest++;
      this.answerSelected = false;
      this.selectedOptionIndex = null;
      this.getProgressPercent();
      if (questno === this.questionList.length - 1) {
        this.isQuizComplete = true;
        this.stopCounter();
      }
    }, 2000);
  }
  startCounter() {
    this.interval$ = interval(1000).subscribe(val => {
      this.counter--;
      if (this.counter === 0) {
        this.skippedQue++;
        this.currQuest++;
        this.counter = 60;
        this.points -= 10;

      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.currQuest = 0;
    this.counter = 60;
    this.correctAns = 0;
    this.incorrectAns = 0;
  }
  getProgressPercent() {
    this.progress = ((this.currQuest / this.questionList.length) * 100).toString();
    return this.progress;
  }
}
