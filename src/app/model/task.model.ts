import {Customer} from "./customer.model";

export class Task {

    id: number;
    title: string;
    description: string;
    klantId: number;
    customer: Customer;

    constructor(obj: any) {
        this.id             = obj && obj.id                 || null;
        this.title          = obj && obj.title              || null;
        this.description    = obj && obj.description        || null;
        this.klantId        = obj && obj.klantId            || null;
        this.customer       = obj && obj.customer           || null;
    }
}