import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule} from '@angular/router';

import { routing } from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TaskListComponent } from './task//task-list.component';
import { TaskRowComponent } from './task/task-row.component';
import { TaskDetailComponent } from './task/task-detail.component';
import { HeaderComponent } from './header/header.component';

import { AuthService } from './auth/auth.service';
import {LoggedInGuard} from "./guards/logged-in-guard.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskListComponent,
    TaskRowComponent,
    TaskDetailComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    routing,
  ],
  providers: [
    AuthService,
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
