import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router) { }
   startQuiz(name: string) {
    if (name.trim()) {
      localStorage.setItem('name', name);
      this.router.navigate(['/question']);
    } else {
      alert('Please enter your name to start the quiz!');
    }
  }
}
