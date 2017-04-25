"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var task_model_1 = require('./../model/task.model.ts');
var TaskListComponent = (function () {
    function TaskListComponent() {
        this.tasks = [
            new task_model_1.Task(3, 'Kristof', 'cat1'),
            new task_model_1.Task(2, 'Jerome', 'cat1'),
            new task_model_1.Task(1, 'Guillaume', 'cat1'),
        ];
    }
    TaskListComponent.prototype.ngOnInit = function () {
    };
    TaskListComponent = __decorate([
        core_1.Component({
            selector: 'app-tasklist',
            templateUrl: 'task-list.component.html',
        })
    ], TaskListComponent);
    return TaskListComponent;
}());
exports.TaskListComponent = TaskListComponent;
