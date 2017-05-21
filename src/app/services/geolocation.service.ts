import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {disableDebugTools} from "@angular/platform-browser";

const GEOLOCATION_ERRORS = {
  'errors.location.unsupportedBrowser': 'Browser ondersteund geen geolocation',
  'errors.location.permissionDenied': 'Geen toegang tot geolocatie',
  'errors.location.positionUnavailable': 'Verkeerde geolocatie data',
  'errors.location.timeout': 'Timeout',
};

@Injectable()
export class GeolocationService {


  constructor() { }

  initLocation(){
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
          },
          (error) => {
            console.log(error);
          }
      );
    }

  }

  // Get geolocation from device and calculate distance.
  getRangeOfCoordinates(lat,long): Observable<any> {

    return Observable.create(observer => {

      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {

              let distance: any = this.getDistanceFromLatLonInKm(
                  position.coords.latitude,
                  position.coords.longitude,
                  lat,
                  long
              ).toFixed(3);

              observer.next(distance);
              observer.complete();

            },
            (error) => {
              switch (error.code) {
                case 1:
                  observer.error(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
                  break;
                case 2:
                  observer.error(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
                  break;
                case 3:
                  observer.error(GEOLOCATION_ERRORS['errors.location.timeout']);
                  break;
              }
            }
         );
      }
      else {
        observer.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
      }


    });
  }

  // Calculate distance from 2 points
  getDistanceFromLatLonInKm(lat1:number ,lon1:number ,lat2:number ,lon2: number): number {
    let R = 6371; // Radius of the earth in km
    let dLat: number = this.deg2rad(lat2-lat1);  // deg2rad below
    let dLon: number = this.deg2rad(lon2-lon1);

    let a  =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
    let c  = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d  = R * c; // Distance in km
    return d;
  }

  // Helper function to convert deg to rad.
  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }
}
