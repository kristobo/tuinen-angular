import { Injectable } from '@angular/core';
import { Track } from "../model/track.model";
import { DataService } from "../services/data.service";
import {isUndefined} from "util";

/**
 * This Class holds an track object with the running tracking data.
 */
@Injectable()
export class TrackingService {
    track: Track;

    constructor(private dataService: DataService) { }

    public start(opdrachtId: number, taskId: number, startTime: number ){
        this.track = new Track(opdrachtId, taskId, startTime, null);
        console.log("track-start", this.track);

    }

    public stop(endTime: number ){
        this.track.endTime = endTime;
        this.dataService.trackTaskTime(this.track).subscribe(
            data => {
                console.log(data);
                this.track = null;
            },
            error => {
                console.log(error);
            }
        );
        console.log("track-stop", this.track);
    }

    public isTaskActive(taskId: number){
       let active: boolean= false;
       if(!isUndefined(this.track) && this.track != null){
           if(this.track.taskId == taskId){
               active = true;
           }
       }
       return active;
    }

    public isTrackRunning(){
        let running: boolean = false;
        if(!isUndefined(this.track) && this.track != null){
            running = true;
        }
        return running;
    }

}
