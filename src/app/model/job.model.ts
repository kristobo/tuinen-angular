import { Customer } from "./customer.model";
import { Task } from "./task.model";
import { Material } from "./material.model";

export class Job {

    id: number;
    klantId: number;
    klantAdresId: number;
    longitude: number;
    latitude: number;
    task: Task;
    customer: Customer;

    constructor(obj: any) {
        this.id             = obj && obj.id                 || null;
        this.klantId        = obj && obj.klantId            || null;
        this.klantAdresId   = obj && obj.klantAdresId       || null;
        this.longitude      = obj && obj.longitude          || null;
        this.latitude       = obj && obj.latitude           || null;
        this.task           = obj && obj.task               || null;
        this.customer       = obj && obj.customer           || null;

    }
}