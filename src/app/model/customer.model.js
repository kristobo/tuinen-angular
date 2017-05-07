"use strict";
var Customer = (function () {
    function Customer(obj) {
        this.id = obj && obj.id || null;
        this.bedrijfnaam = obj && obj.bedrijfnaam || null;
        this.btwNummer = obj && obj.btwNummer || null;
    }
    return Customer;
}());
exports.Customer = Customer;
