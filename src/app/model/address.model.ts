import {Customer} from "./customer.model";
import {Task} from "./task.model";

export class Address {

    id: number;
    straat: string;
    nummer: number;
    bus: number;
    postcode: number;
    plaats: string;


    constructor(obj: any) {
        this.id             = obj && obj.id                 || null;
        this.straat         = obj && obj.straat             || null;
        this.nummer         = obj && obj.nummer             || null;
        this.bus            = obj && obj.bus                || null;
        this.postcode       = obj && obj.postcode           || null;
        this.plaats         = obj && obj.plaats             || null;


    }
}