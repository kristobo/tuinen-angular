import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'app-tasklist',
  templateUrl: 'task-list.component.html',
})
export class TaskListComponent implements OnInit {
  tasks: Task[];

  constructor() {

    let task1 = {
        'id' :3,
        'title' : 'Taak 1',
        'category': 'cat2'
    };

    let task2 = {
      'id' :2,
      'title' : 'Taak 2',
      'category': 'cat2'
    };

    let task3 = {
      'id' :1,
      'title' : 'Taak 3',
      'category': 'cat2'
    };


    this.tasks = [
      new Task(task1),
      new Task(task2),
      new Task(task3),
    ];


  }

  ngOnInit() {
  }

}
