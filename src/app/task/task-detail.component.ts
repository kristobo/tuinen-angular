import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
declare var jQuery:any;

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
})
export class TaskDetailComponent implements OnInit, AfterViewInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

      this.activatedRoute.params.subscribe((params: Params) => {
          let taskId = params['id'];

          console.log(taskId);
      });

  }

  ngAfterViewInit() {

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
