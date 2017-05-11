import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Job } from '../model/job.model';
import { Track } from '../model/track.model';
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
  startTime: number;

  constructor(private activatedRoute: ActivatedRoute,
              private dataService   : DataService,
              ) {
      this.getJobInfo();

  }

  ngOnInit() {

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

                  // Get rest of the info
                  this.getCustomerInfo(this.job.klantId);
                  console.log(job);
              },
              error => {
                  console.log(error);
              }
          );

      });

  }

  getCustomerInfo(id: number){

    this.dataService.getCustomer(id)
        .subscribe(
            customer =>{
                this.job.customer = customer;
                this.getAddressInfo(this.job.klantAdresId);
            },
            error => {
                console.log(error);
            }

        );
  }

  getAddressInfo(id: number){

      this.dataService.getAddress(id)
          .subscribe(
              address =>{
                  this.job.customer.address = address;
                  sessionStorage.setItem('job', JSON.stringify(this.job));
              },
              error => {
                  console.log(error);
              }

          );
  }

  PausePlay(status) {
    // Prevent recording when task is finished
    let time = new Date().getTime();

    if(this.job.task.vooruitgangPercentage !=100){

        if(status == "play") {
            this.paused = false;
            this.startTime = time;
            console.log("play", time);

        } else {
            this.paused = true;
            console.log("pauze", time);
            this.trackPeriod(this.startTime,time);
        }
    }
  }

  Stop() {
      if(!this.paused){
          let endTime = new Date().getTime();
          this.trackPeriod(this.startTime, endTime);
      }
      this.updateStatus(100);
  }

  trackPeriod(startTime, endTime){
      let track = new Track(startTime, endTime, this.job.task.opdrachtId, this.job.task.id);
      console.log(track);
  }


  updateStatus(value){
      if(value == 100){
          this.paused = true;
      }
      this.job.task.vooruitgangPercentage = value;
      this.dataService.updateStatus(JSON.stringify(this.job)).subscribe(
          data => {
              console.log(data);
          },
          error => {
              console.log(error);
          }
      );
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
