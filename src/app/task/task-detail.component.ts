import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { Job } from '../model/job.model';
import { DataService } from '../services/data.service';
import { TrackingService } from "../services/tracking.service";
import { TaskStatus } from "./enum.status";
import { JobService } from "../services/job.service";

declare var jQuery:any;

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  providers: [JobService],
})
export class TaskDetailComponent implements OnInit, AfterViewInit {
  job: Job;
  paused: boolean = true;
  loading: boolean;
  disActions: String;

  constructor(private activatedRoute : ActivatedRoute,
              private dataService    : DataService,
              private trackingService: TrackingService,
              private jobService     : JobService,
              ) {
     }

  ngOnInit() {
      this.getJobInfo();
  }

  ngAfterViewInit() {
      this.initMaterializeJs();
  }

  // Get current job info and store in sessionStorage.
  getJobInfo(){
      this.loading = true;
      this.activatedRoute.params.subscribe((params: Params) => {
          let taskId = params['id'];
          this.dataService.getJobByTaskId(taskId).subscribe(
              job =>{
                  this.loading = false;
                  this.job = job;
                  this.jobService.save(job);

                  // Get rest of the info.
                  this.getCustomerInfo(this.job.klantId);

                  // Init actions buttons.
                  this.initActions();
              },
              error => {
                  console.log(error);
              }
          );

      });

  }

  // Init correct layout.
  initActions(){
      if(this.trackingService.isTrackRunning()){
          if(this.trackingService.isTaskActive(this.job.task.id)){
              // If track is running on this job, set correct buttons state.
              this.paused = false;
          }else{
              // If track is running on an other job, then show a message.
              this.disActions = "Een andere taak is actief";
          }
      }
  }

  // Get Customer info for currect job.
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

  // Get Address info for current job.
  getAddressInfo(id: number){

      this.dataService.getAddress(id)
          .subscribe(
              address =>{
                  this.job.customer.address = address;
                  this.jobService.save(this.job);
              },
              error => {
                  console.log(error);
              }

          );
  }

  ActionButtun(status) {
    // Prevent recording when task is finished.
    // /1000 because getTime is in milliseconds.
    let time = new Date().getTime()/1000;

    if(this.job.task.vooruitgangPercentage !=100){

        // ButtenHandler.
        if(status == "play") {
            this.paused = false;
            let status = TaskStatus.Gestart;

            if(this.startedOne()){
                status = TaskStatus.Hervat;
            }
            this.updateStatus(status);
            this.trackingService.start(this.job.id, this.job.task.id, time);

        }
        else if(status == "stop"){
            this.updateProgress(100);
        }
        else if(status == "pauze") {
            this.paused = true;
            this.updateStatus(TaskStatus.Gepauzeerd);
            this.trackingService.stop(time);
        }
    }
  }

  // Update task progress.
  updateProgress(value){
      this.loading = true;

      if(value == 100){
          this.paused = true;
          this.updateStatus(TaskStatus.Afgewerkt);

          if(this.trackingService.isTrackRunning() &&
             this.trackingService.isTaskActive(this.job.task.id)){
              let time = new Date().getTime()/1000;
              this.trackingService.stop(time);
          }

      }

      this.job.task.vooruitgangPercentage = value;
      this.dataService.updateProgress(this.job).subscribe(
          data => {
              this.loading = false;
              console.log(data);
          },
          error => {
              this.loading = true;
              console.log(error);
          }
      );
  }

  // Set correct task status.
  updateStatus(statusId: number){
      this.loading = true;

      this.job.task.statusId = statusId;
      this.dataService.updateStatus(this.job).subscribe(
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

  // Not used because original value gets overwritten.
  setCoordinates(){
      navigator.geolocation.getCurrentPosition(function(location) {
          this.job.long = location.coords.longitude;
          this.job.lat = location.coords.latitude;
        });
  }

  // Check if started one to set correct status.
  startedOne(){
      let started = localStorage.getItem(this.job.task.id.toString());
      if(started){
          return true;
      }
      return false;
  }

  initMaterializeJs(){
      // Init materializecss dropdown menu.
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
