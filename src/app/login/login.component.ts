import {Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../auth/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;
  error: String;

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router) {

    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  onSubmit(form): void {
    this.loading = true;
    this.error = "";
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
        });
  }

  ngOnInit() {
    this.authService.logout();
  }

}
