import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-label',
  templateUrl: './task-label.component.html',
  styleUrls: ['./task-label.component.scss']
})
export class TaskLabelComponent implements OnInit {

  @Input() variant: string;
  
  constructor() { }

  ngOnInit() {
  }

}
