import { Component, OnInit, Input } from '@angular/core';
import {Task} from "./task.model";

@Component({
  selector: 'app-task',
  templateUrl: 'task-row.component.html'
})
export class TaskRowComponent implements OnInit {
  @Input() task: Task;

  constructor() {
  }

  ngOnInit() {
  }

}
