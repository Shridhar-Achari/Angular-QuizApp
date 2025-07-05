import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuestionComponent } from './components/question/question.component';

export const routes: Routes = [
     {
        path:"", component:HomeComponent, pathMatch:"full"
    },
    {
        path:"home", component:HomeComponent
    },
    {
        path:"question", component:QuestionComponent
    }
];
