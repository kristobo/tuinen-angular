import {  RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { TaskListComponent } from './task//task-list.component';
import { TaskDetailComponent } from './task/task-detail.component';
import { LoggedInGuard } from './auth/logged-in-guard.service';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'tasks', component: TaskListComponent, canActivate: [LoggedInGuard] },
    { path: 'task/:id', component: TaskDetailComponent, canActivate: [LoggedInGuard] },
];

export const routing = RouterModule.forRoot(routes);