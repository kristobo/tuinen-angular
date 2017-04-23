import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Task } from './../task/task.model';
import {Observable} from "rxjs";

@Injectable()
export class TaskService {

  constructor(private http: Http) { }

  getAllTasks(): Observable<Task[]>{
    return this.http.get('/task/all')
        .map((response: Response) => response.json());
  }

}
