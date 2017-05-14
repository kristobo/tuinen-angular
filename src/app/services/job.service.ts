import { Injectable } from '@angular/core';
import { Job } from '../model/job.model';

@Injectable()
export class JobService {

  constructor() { }

  // Save job
  public save(job: Job): void{
    sessionStorage.setItem('currentJob', JSON.stringify(job));
  }

  public getCurrent(){
    let job: Job = JSON.parse(sessionStorage.getItem('currentJob'));
    return job;
  }



}
