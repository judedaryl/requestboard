import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskModalComponent } from 'src/app/shared/components/task-modal/task-modal.component';

@Component({
  selector: 'app-task-shell',
  templateUrl: './task-shell.component.html',
  styleUrls: ['./task-shell.component.scss']
})
export class TaskShellComponent implements OnInit {

  rows = Array(15).fill(null).map((_,ix) => ix);
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openModal() {
    var modal = this.modalService.open(TaskModalComponent, {
      size: "lg"
    });
    modal.componentInstance.name = 'Fix email Issue';
  }

}
