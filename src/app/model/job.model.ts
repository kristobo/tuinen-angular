import {Customer} from "./customer.model";
import {Task} from "./task.model";

export class Job {

    id: number;
    klantId: number;
    klantAdresId: number;
    long: number;
    lat: number;
    task: Task;
    customer: Customer;

    constructor(obj: any) {
        this.id             = obj && obj.id                 || null;
        this.klantId        = obj && obj.klantId            || null;
        this.klantAdresId   = obj && obj.klantAdresId       || null;
        this.long           = obj && obj.long               || null;
        this.lat            = obj && obj.lat                || null;
        this.task           = obj && obj.task               || null;
        this.customer       = obj && obj.customer           || null;
    }
}