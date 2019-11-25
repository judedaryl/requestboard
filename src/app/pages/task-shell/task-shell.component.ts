import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskModalComponent } from 'src/app/shared/components/task-modal/task-modal.component';
import * as Hammer from 'hammerjs';
@Component({
  selector: 'app-task-shell',
  templateUrl: './task-shell.component.html',
  styleUrls: ['./task-shell.component.scss']
})
export class TaskShellComponent implements OnInit {

  rows = ['Issues', 'Features', 'Bugs', 'Meetings', 'Tests', 'Quality Assurance', 'Assured', 'Nice to have'];
  // @ViewChild('taskContainer', { static: true }) taskContainer: ElementRef<HTMLDivElement>;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    // const mc = new Hammer.Manager(this.taskContainer.nativeElement);
    // const pr = mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL }));

    // mc.on('pan panstart panmove', (ev) => {
    //   if (ev.target === this.taskContainer.nativeElement) {
    //     const { pointers, changedPointers, srcEvent, ...rest} = ev;
    //     const left = this.taskContainer.nativeElement.scrollLeft;
    //     const move = left + ev.deltaX;
    //     console.log(rest);
    //     this.taskContainer.nativeElement.scrollTo({left : move});
    //    // console.log(ev.additionalEvent);
    //   }
    // });
  }

  onPan(ev: HammerInput) {

    console.log(ev);
  }

  openModal() {
    const modal = this.modalService.open(TaskModalComponent, {
      size: 'lg'
    });
    modal.componentInstance.name = 'Fix email Issue';
  }

}
