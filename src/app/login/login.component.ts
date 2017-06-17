import {Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../auth/auth.service";
import { GeolocationService } from "../services/geolocation.service";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  providers: [GeolocationService],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;
  error: String;
  message: String;

  constructor(
      private fb: FormBuilder,
      private activatedRoute: ActivatedRoute,
      private authService: AuthService,
      private router: Router,
      private geo: GeolocationService) {

    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  // Handle login credentials.
  onSubmit(form): void {
    this.loading = true;
    this.error = "";
    this.message = "";
    this.authService.authenticate(form.value).subscribe(
        data => {
          this.router.navigate(["/tasks"]);
        },
        error => {
          console.log(error);
          this.error = "Connection error";
          if(error._body && typeof error._body ==="string"){
            this.error = error._body;
          }
          this.loading = false;
        }
    );
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let param = params['state'];
      if(param == "passwordChanged"){
        this.message = "Het paswoord is succesvol gewijzigd."
      }
    });


    if(this.authService.isLoggedIn()){
      this.router.navigate(["/tasks"]);
    }
    this.geo.initLocation();
  }

}
