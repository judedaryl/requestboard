import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable, merge, combineLatest, forkJoin, BehaviorSubject } from 'rxjs';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { startWith, map, mergeAll, mergeMap, concatAll } from 'rxjs/operators';
@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class TaskModalComponent implements OnInit {
  @Input() name: string;
  @Input() due: Date = new Date();
  @Input() completed = false;

  comments: Comment[] = [{
    message: 'asdasdasd',
    time: new Date()
  }];

  $due: Observable<Date>;
  $isdue: Observable<boolean>;
  $completed: Observable<boolean>;
  $fileDragged = new BehaviorSubject(false);

  dueCtrl: FormControl;
  compCtrl: FormControl;
  commentForm: FormGroup;
  get commentCtrl() { return this.commentForm.get('comment'); }

  @HostListener('mouseenter')
  leave(ev) {
    console.log('ENTERED');
    this.$fileDragged.next(true);
  }
  @HostListener('mouseleave')
  enter(ev) {
    console.log('LEAVE');
    this.$fileDragged.next(false);
  }
  @HostListener('dragover')
  over(ev) {
    console.log(ev);
  }
  @HostListener('drop')
  drop(ev) {
    console.log(ev);
  }
  constructor(private fb: FormBuilder) {
    this.dueCtrl = fb.control(this.due);
    this.compCtrl = fb.control(this.completed);
    this.commentForm = fb.group({
      comment: ''
    });

    this.$due = this.dueCtrl.valueChanges.pipe(startWith(this.due));
    this.$completed = this.compCtrl.valueChanges.pipe(startWith(this.completed));
    this.$isdue = merge(this.dueCtrl.valueChanges, this.compCtrl.valueChanges)
    .pipe(
      startWith({}),
      map(() => this.dueCtrl.value),
      map((val: Date) => {
        console.log(val);
        return new Date().getTime() > val.getTime();
      }) 
    );
  }

  ngOnInit() {
  }

  addComment(message: string) {
    const time = new Date();
    this.comments.push({message, time});
    this.commentCtrl.reset();
  }



}


interface Comment {
  message: string;
  time: Date;
}