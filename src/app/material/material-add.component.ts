import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { Job } from '../model/job.model';
import { Material } from '../model/material.model';
import { MaterialService } from '../services/material.service';
import { JobService } from '../services/job.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-material-add',
  templateUrl: './material-add.component.html',
  providers: [MaterialService, JobService],
})
export class MaterialAddComponent implements OnInit {
  material: Material;
  loading: boolean = false;

  constructor(private activatedRoute      : ActivatedRoute,
              private materialService     : MaterialService,
              private jobService          : JobService,
              private dataService         : DataService,) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      let materialId = params['id'];
      this.material = this.materialService.getMaterialById(materialId);

    });
  }

  // Increase value.
  add(){
    this.material.hoeveelheid = this.material.hoeveelheid + 0.5;
  }

  // Decrease value.
  remove(){
    this.material.hoeveelheid = this.material.hoeveelheid - 0.5;
  }

  updateJobMaterial(){
    this.loading = true;
    let job: any = new Job(this.jobService.getCurrent());
    this.material.opdrachtId = job.id;
    this.dataService.addJobMaterial(this.material).subscribe(
        data => {
          this.loading = false;
          console.log(data);
        },
        error => {
          this.loading = false;
          console.log(error);
        }
    );

  }

}
