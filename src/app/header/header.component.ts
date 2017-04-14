import {Component, OnInit, AfterViewInit} from '@angular/core';
declare var jQuery:any; //Make Jquery enable as variable

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, AfterViewInit {


  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Init materializecss side nav
    jQuery('.button-collapse').sideNav();

    jQuery('.side-nav li a').on('click',function(){
      jQuery('.button-collapse').not('.active').sideNav('hide');
    });

  }




}
