import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task.model';
import { TaskService } from './../services/task.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: 'task-list.component.html',
  providers: [TaskService],
})
export class TaskListComponent implements OnInit {
  tasks: Task[];

  constructor(private taskService: TaskService) {

  }

  ngOnInit() {
    this.getAllTasks();
  }

  private getAllTasks(){

    this.taskService.getAllTasks()
        .subscribe(
            tasks =>{
              this.tasks = tasks
            }
        );
  }

}
