import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Task } from '../model/task.model';
import { Customer } from '../model/customer.model';
import { Observable} from "rxjs";

@Injectable()
export class TaskService {

  constructor(private http: Http) { }

  public getAllTasks(): Observable<Task[]>{
    return this.http.get('/task/all')
        .map((response: Response) => response.json())
          .flatMap((tasks: Task[]) => {

              return Observable.forkJoin(
                  tasks.map((task: Task) => {
                      return this.http.get('/customer/' + task.klantId)
                          .map((res: any) => {
                              let customer: Customer = res.json();
                              task.customer = customer;
                              return task;
                          })
                  })
              );

          });
  }

  public getTask(id: number): Observable<Task>{
      return this.http.get('task/'+ id)
          .map((response: Response) => response.json())
  }
}
