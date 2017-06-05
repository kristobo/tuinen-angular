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
              this.materialList = this.sortedMaterials(materials);
            },
            error => {
              this.loading = false;
              this.error = error;
              console.log(error);
            }
        );
  }

  sortedMaterials(materials: Material[]): Material[] {
        return materials.sort((a: Material, b: Material) => {
            if (a.naam < b.naam) return -1;
            else if (a.naam > b.naam) return 1;
            else return 0;
        });
  }

}
