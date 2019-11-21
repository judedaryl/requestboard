import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TaskModalComponent } from './shared/components/task-modal/task-modal.component';

const routes: Route[] = [
  { path: '', loadChildren: () => import('./pages/pages.module').then(q => q.PagesModule) },
  { path: 'test', component: TaskModalComponent }
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
