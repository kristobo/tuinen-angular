import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../auth/auth.service";

declare var jQuery:any; //Make Jquery enable as variable

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, AfterViewInit {


  constructor(private router: Router,
              private authService: AuthService) {
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

  goToHome(){
    this.router.navigate(["/tasks"]);
  }

  logOut(){
    this.authService.logout();
  }
}
