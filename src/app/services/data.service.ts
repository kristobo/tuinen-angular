import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Task } from '../model/task.model';
import { Job } from '../model/job.model';
import { Customer } from '../model/customer.model';
import { Address } from '../model/address.model';
import { Observable} from "rxjs";

@Injectable()
export class DataService {

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

          })
         .catch(this.handleError);
    }

    public getJobByTaskId(id: number): Observable<Job>{
        return this.http.get('/task/'+ id)
            .map((res: Response) => res.json())
            .flatMap((task: Task) => {
                //Get Job data
                return this.http.get('/job/' + task.opdrachtId)
                    .map((res: Response) => res.json())
                    .flatMap((job : any)=> {
                        return Observable.forkJoin([
                            this.http.get('/customer/' + job.klantId).map(res => res.json()),
                            this.http.get('/address/'  + job.klantAdresId).map(res => res.json())
                        ]).map((data: any[]) => {
                                let customer: any = data[0];
                                let address:  any = data[1];
                                customer.address = address;
                                job.customer = customer;
                                job.task = task;
                                return job;
                        });
                    });
            })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.toString() || 'Connection error');
    }

}
