import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task.model';
import { DataService} from '../services/data.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: 'task-list.component.html',
  providers: [DataService],
})
export class TaskListComponent implements OnInit {
  tasks: Task[];
  loading: boolean;

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks(){
    this.loading = true;
    this.dataService.getAllTasks()
        .subscribe(
            tasks =>{
              this.loading = false;
              this.tasks = tasks;
            },
        );
  }

}
