"use strict";
var Task = (function () {
    function Task(obj) {
        this.id = obj && obj.id || null;
        this.taakNaam = obj && obj.taakNaam || null;
        this.opmerking = obj && obj.opmerking || null;
        this.klantId = obj && obj.klantId || null;
        this.customer = obj && obj.customer || null;
        this.vooruitgangPercentage = obj && obj.vooruitgangPercentage || null;
    }
    return Task;
}());
exports.Task = Task;
