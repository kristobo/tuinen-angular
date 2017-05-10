import { Component, OnInit } from '@angular/core';
import { Job } from './../model/job.model';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-map',
  templateUrl: 'map.component.html',
})
export class MapComponent implements OnInit {
  mapUrl: any;

  constructor(sanitizer: DomSanitizer) {
    let job = JSON.parse(sessionStorage.getItem('job'));
    this.mapUrl =
        sanitizer.bypassSecurityTrustResourceUrl(
        "https://www.google.com/maps/embed/v1/place?" +
        "key=AIzaSyC7r-xZGitdgfvMXOfB2aDmrpzGlIt4pH0" +
        "&q="+job.customer.address.straat+"+"+job.customer.address.nummer+"," +
        ""+job.customer.address.postcode+"+"+job.customer.address.plaats+"");
  }

  ngOnInit() {

  }

}
