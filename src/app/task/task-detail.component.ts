import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Job } from '../model/job.model';
import { DataService } from '../services/data.service';
declare var jQuery:any;

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  providers: [DataService],
})
export class TaskDetailComponent implements OnInit, AfterViewInit {
  job: Job;
  paused: boolean = true;
  loading: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private dataService   : DataService,
              ) { }

  ngOnInit() {
     this.getJobInfo();
  }

  ngAfterViewInit() {

      this.initMaterializeJs();
  }

  getJobInfo(){
     this.loading = true;
      this.activatedRoute.params.subscribe((params: Params) => {
          let taskId = params['id'];
          this.dataService.getJobByTaskId(taskId).subscribe(
              job =>{
                  this.loading = false;
                  this.job = job;
                  sessionStorage.setItem('job', JSON.stringify(job));
              },
          );

      });

  }

  PausePlay() {

        if(this.paused) {
            this.paused = false;

        } else {
            this.paused = true;

        }

  }

  updateStatus(value){
      this.job.task.vooruitgangPercentage = value;


  }

  initMaterializeJs(){
      // Init materializecss dropdown menu
      jQuery('.quick-list-btn').dropdown({
              inDuration: 300,
              outDuration: 225,
              constrainWidth: false, // Does not change width of dropdown to that of the activator
              hover: true, // Activate on hover
              gutter: 0, // Spacing from edge
              belowOrigin: false, // Displays dropdown below the button
              alignment: 'right', // Displays dropdown with edge aligned to the left of button
              stopPropagation: false // Stops event propagation
          }
      );
  }



}
