import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { TaskShellComponent } from './task-shell/task-shell.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [TaskShellComponent],
  imports: [
    SharedModule,
    CommonModule,
    PagesRoutingModule,
    NgbModule
  ]
})
export class PagesModule { }
