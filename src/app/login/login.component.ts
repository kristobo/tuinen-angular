import {Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../auth/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;
  message: String;

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
    this.message = "git a";
    this.authService.authenticate(form.value).subscribe(
        data => {
          this.router.navigate(["/tasks"]);
        },
        error => {
          this.message = "Verkeerde gebruikersnaam of paswoord.";
          this.loading = false;
        });
  }

  ngOnInit() {

  }

}
