import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { JobService } from "../services/job.service";


@Component({
    selector: 'app-map',
    templateUrl: 'map.component.html',
    providers: [JobService],
})
export class MapComponent implements OnInit {
    mapUrl: any;

    constructor(private sanitizer: DomSanitizer,
                private jobService: JobService) {

        // Get current job info.
        let job = jobService.getCurrent();

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
