import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { Job } from '../model/job.model';
import { Material } from '../model/material.model';
import { MaterialService } from '../services/material.service';
import { JobService } from '../services/job.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-material-add',
  templateUrl: './material-add.component.html',
  providers: [MaterialService, JobService],
})
export class MaterialAddComponent implements OnInit {
  material: Material;
  loading: boolean = false;
  step:number = 0.5;


  constructor(private activatedRoute      : ActivatedRoute,
              private materialService     : MaterialService,
              private jobService          : JobService,
              private dataService         : DataService,
              private router              : Router,) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      let materialId = params['id'];
      this.material = this.materialService.getMaterialById(materialId);
      if(this.material.eenheidsmaat == "stuk"){
        this.step = 1;
      }
    });
  }

  // Increase value.
  add(){
    this.material.hoeveelheid = this.material.hoeveelheid + this.step;
  }

  // Decrease value.
  remove(){
    if(this.material.hoeveelheid >= this.step){
      this.material.hoeveelheid = this.material.hoeveelheid - this.step;
    }
  }

  // Add material to job and go back.
  updateJobMaterial(){
    this.loading = true;
    let job: any = new Job(this.jobService.getCurrent());
    this.material.opdrachtId = job.id;
    this.dataService.addJobMaterial(this.material).subscribe(
        data => {
          this.loading = false;
          this.router.navigate(["/task", job.task.id]);
          console.log(data);
        },
        error => {
          this.loading = false;
          console.log(error);
        }
    );

  }

}
