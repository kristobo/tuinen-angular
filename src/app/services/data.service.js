"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var rxjs_1 = require("rxjs");
var DataService = (function () {
    function DataService(http) {
        this.http = http;
    }
    DataService.prototype.getAllTasks = function () {
        var _this = this;
        return this.http.get('/task/all')
            .map(function (response) { return response.json(); })
            .flatMap(function (tasks) {
            return rxjs_1.Observable.forkJoin(tasks.map(function (task) {
                return _this.http.get('/customer/' + task.klantId)
                    .map(function (res) {
                    var customer = res.json();
                    task.customer = customer;
                    return task;
                });
            }));
        })
            .catch(this.handleError);
    };
    DataService.prototype.getTask = function (id) {
        return this.http.get('/task/' + id)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.handleError = function (error) {
        console.error(error);
        return rxjs_1.Observable.throw(error.json().error || 'Server error');
    };
    DataService = __decorate([
        core_1.Injectable()
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
