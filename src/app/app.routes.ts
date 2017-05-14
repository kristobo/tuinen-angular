import {  RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { TaskListComponent } from './task//task-list.component';
import { TaskDetailComponent } from './task/task-detail.component';
import { MaterialListComponent } from './material/material-list.component';
import { MaterialListEditComponent } from './material/material-list-edit.component';
import { MaterialAddComponent } from './material/material-add.component';
import { MapComponent } from './map/map.component';
import { LoggedInGuard } from './auth/logged-in-guard.service';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'tasks', component: TaskListComponent, canActivate: [LoggedInGuard] },
    { path: 'task/map', component: MapComponent, canActivate: [LoggedInGuard] },
    { path: 'task/:id', component: TaskDetailComponent, canActivate: [LoggedInGuard] },
    { path: 'material/list', component: MaterialListComponent, canActivate: [LoggedInGuard] },
    { path: 'material/list/job', component: MaterialListEditComponent, canActivate: [LoggedInGuard] },
    { path: 'material/add/:id', component: MaterialAddComponent, canActivate: [LoggedInGuard] },
];

export const routing = RouterModule.forRoot(routes);