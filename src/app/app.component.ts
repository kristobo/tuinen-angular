import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
`
})
export class AppComponent extends OnInit{

  ngOnInit() {

  }


}
