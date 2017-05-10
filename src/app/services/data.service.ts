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
            .catch(this.handleError);
    }

    public getCustomer(id: number): Observable<Customer>{
        return this.http.get('/customer/' + id)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    public getAddress(id: number): Observable<Address>{
        return this.http.get('/address/' + id)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    public getJobByTaskId(id: number): Observable<Job>{
        return this.http.get('/task/'+ id)
            .map((res: Response) => res.json())
            .flatMap((task: Task) => {
                //Get Job data
                return this.http.get('/job/' + task.opdrachtId)
                    .map((res: Response) =>{
                        let job: Job = res.json();
                        job.task = task;
                        return job;
                    })
            })
            .catch(this.handleError);
    }

    public updateStatus(job: any){
        console.log(job);
        return this.http.post('/task/status', job)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        if(error['_body'] && typeof error['_body'] ==="string"){
            return Observable.throw(console.log(error) || error['_body']);
        }
        return Observable.throw(console.log("Connection error"));
    }

    /*
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
                            }).catch(this.handleError)
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
    }*/
}
