import { Component, OnInit } from '@angular/core';
import { Material } from '../model/material.model';
import { DataService } from '../services/data.service';
import { Job } from "../model/job.model";
import { JobService } from "../services/job.service";

@Component({
  selector: 'app-material-list-edit',
  templateUrl: './material-list-edit.component.html',
  providers: [JobService],
})
export class MaterialListEditComponent implements OnInit {
  materialList: Material[];
  loading: boolean = false;
  error: string;

  constructor(private jobService     : JobService,
              private dataService    : DataService,) { }

  ngOnInit() {
    let job: Job = this.jobService.getCurrent();
    let jobId: number = job.id;
    this.getAllMaterialsByJob(jobId);
  }

  // Get all tasks for logged in user.
  getAllMaterialsByJob(id: number){
    this.loading = true;
    this.dataService.getAllMaterialsForJob(id)
        .subscribe(
            materials =>{
              this.loading = false;
              this.materialList = materials;
            },
            error => {
              this.loading = false;
              console.log(error);
            }
        );
  }

}
