import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskLabelComponent } from './components/task-label/task-label.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FooterComponent, 
    TaskCardComponent, 
    TaskLabelComponent, 
    TaskModalComponent
  ],
  entryComponents: [
    TaskModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [
    FooterComponent,
    TaskCardComponent,
    TaskLabelComponent,
    TaskModalComponent
  ]
})
export class SharedModule { }
