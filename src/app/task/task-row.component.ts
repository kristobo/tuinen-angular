import { Component, OnInit, Input } from '@angular/core';
import {Task} from "../model/task.model";
import {TrackingService} from "../services/tracking.service";

@Component({
  selector: 'app-task',
  templateUrl: 'task-row.component.html',
})
export class TaskRowComponent implements OnInit {
  @Input() task: Task;

  constructor(private trackingService: TrackingService) {

  }

  ngOnInit() {
  }

  isActive(){
    return this.trackingService.isTaskActive(this.task.id);
  }

}
