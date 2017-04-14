import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

  constructor (private http: Http) {
  }

  authenticate(formData: any) {


      // Set correct headers
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      // Use default form format to send
      let params = new URLSearchParams();
      params.append('username', formData.username);
      params.append('password', formData.password);
      let data = params.toString();


      // Post!
      return this.http.post(
            'http://localhost:61251/tuinbouw/rest/login',
            data,
            { headers: headers })
            .map((response: Response) => {
                localStorage.setItem('token', response.text())
            }
       );
  }

  logout() {
      localStorage.removeItem('token');
  }

  isLoggedIn(): boolean{
      let token = localStorage.getItem('token');
      if(token){
          return true;
      }
      return false;
  }

}
