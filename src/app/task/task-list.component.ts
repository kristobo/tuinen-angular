import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task.model';
import { DataService} from '../services/data.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: 'task-list.component.html',

})
export class TaskListComponent implements OnInit {
  tasks: Task[];
  loading: boolean;
  error: String;

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.getAllTasks();
  }

  // Get all tasks for logged in user.
  getAllTasks(){
    this.loading = true;
    this.dataService.getAllTasks()
        .subscribe(
            tasks =>{
              this.loading = false;
              this.tasks = tasks;
            },
            error => {
                this.error = error;
                this.loading = false;
            }
        );
  }

}
