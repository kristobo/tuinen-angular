"use strict";
var Task = (function () {
    function Task(id, title, category) {
        this.id = id;
        this.title = title;
        this.category = category;
    }
    return Task;
}());
exports.Task = Task;
