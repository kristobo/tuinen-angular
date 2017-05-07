import {Customer} from "./customer.model";

export class Task {

    id: number;
    taakNaam: String;
    opmerking: string;
    klantId: number;
    opdrachtId: number;
    customer: Customer;
    vooruitgangPercentage: number;

    constructor(obj: any) {
        this.id             = obj && obj.id               || null;
        this.taakNaam       = obj && obj.taakNaam         || null;
        this.opmerking      = obj && obj.opmerking        || null;
        this.klantId        = obj && obj.klantId          || null;
        this.opdrachtId     = obj && obj.opdrachtId       || null;
        this.customer       = obj && obj.customer         || null;
        this.vooruitgangPercentage       = obj && obj.vooruitgangPercentage    || null;
    }
}