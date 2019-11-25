import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-panel',
  templateUrl: './task-panel.component.html',
  styleUrls: ['./task-panel.component.scss']
})
export class TaskPanelComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
