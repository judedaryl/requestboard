import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, merge, combineLatest, forkJoin, BehaviorSubject } from 'rxjs';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { startWith, map, mergeAll, mergeMap, concatAll, debounceTime } from 'rxjs/operators';
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

  user: string = 'Daryl Clarino';

  activities: Activity<any>[] = [];

  comments: Comment[] = [{
    message: 'asdasdasd',
    time: new Date()
  }];

  $due: Observable<Date>;
  $isdue: Observable<boolean>;
  $completed: Observable<boolean>;

  files: FileItem[] = [];
  $_fileDragged = new BehaviorSubject(false);
  $fileDragged = this.$_fileDragged.pipe(
    debounceTime(50)
  )

  dueCtrl: FormControl;
  compCtrl: FormControl;
  commentForm: FormGroup;
  get commentCtrl() { return this.commentForm.get('comment'); }


  constructor(private fb: FormBuilder) {
    this.$fileDragged.subscribe(q => {
      console.log(q);
    })

    this.dueCtrl = fb.control(this.due);
    this.compCtrl = fb.control(this.completed);
    this.commentForm = fb.group({
      comment: ['', Validators.required]
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

    // subscribe to comp control to add completion activities
    this.compCtrl.valueChanges.subscribe(q => {
      var status: Status;
      if(q) status = { status: 'Marked as completed' }
      else status = { status: 'Marked as incomplete' }
      this.activities.unshift(new Activity(status, this.user, 'status'))
    })

    this.dueCtrl.valueChanges.subscribe(q => {
      this.activities.unshift(new Activity(q, this.user, 'due'))
    })
  }

  ngOnInit() {
  }

  addComment(message: string) {
    const time = new Date();
    this.activities.unshift(new Activity({message, time}, this.user, 'comment'));
    this.commentCtrl.reset();
  }

  
  over(ev: DragEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    this.$_fileDragged.next(true);
  }

  leave(ev: DragEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    this.$_fileDragged.next(false);
  }

  async drop(ev: DragEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    this.$_fileDragged.next(false);  
    var len = ev.dataTransfer.files.length;
    var files = ev.dataTransfer.files;
    var fileTasks: Promise<FileItem>[] = [];
    for(var i = 0; i < len; i++) {
      fileTasks[i] = this.buildFileItem(files.item(i));
    }
    var fileItems = await Promise.all(fileTasks);
    var activitie = fileItems.map(q => new Activity(q, this.user, 'file'));
    this.activities.unshift(...activitie)
  }

  async buildFileItem(file: File) {
      let src: string = '';
      if(file.type.includes('image')) src = await readURL(file);
      var fileItem: FileItem = {
        file,
        type: file.type,
        src,
        name: file.name,
        isImg: file.type.includes('image')
      }
      return fileItem;
  }


}

function readURL(file: File): Promise<string> {
  return new Promise((res) => {
    var reader = new FileReader();
    reader.onload = (e: any) => {
     res(e.target.result as string)
    }    
    reader.readAsDataURL(file);
  })
}



interface FileItem {
  file: File;
  name: string;
  src?: string;
  type?: string;
  isImg: boolean;
}

interface Comment {
  message: string;
  time: Date;
}

interface Status {
  status: string;
}

type ActivityType = 'comment' | 'file' | 'status' | 'due';

class Activity<T> {

  time: Date;

  constructor(public activity: T,public user: string, public type: ActivityType) {
    this.time = new Date();
  }
}