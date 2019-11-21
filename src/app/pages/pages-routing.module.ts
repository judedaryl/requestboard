import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskShellComponent } from './task-shell/task-shell.component';


const routes: Routes = [
  { path: '', component: TaskShellComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
