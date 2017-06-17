import {Component, OnInit } from '@angular/core';
;import {Router} from '@angular/router'
import {FormBuilder, FormGroup,FormControl , Validators} from '@angular/forms';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-login-reset',
  templateUrl: 'login-reset.component.html',
})
export class LoginResetComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;
  error: String;

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router,
      ) {

    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      pass_n1: ['', Validators.required],
      pass_n2: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  // Handle login credentials.
  onSubmit(form): boolean {
    this.loading = true;
    this.error ="";
    let pass1 = form.controls.pass_n1.value;
    let pass2 = form.controls.pass_n2.value;

    if(pass1 !== pass2){
      this.loading = false;
      this.error = "Paswoorden zijn verschillend.";
      return false;
    }

    this.authService.changePassword(form.value).subscribe(
        data => {
          this.router.navigate(["/login"], {queryParams: {state: 'passwordChanged'}});
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



}
