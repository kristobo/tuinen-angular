import { Address } from "./address.model";

export class Customer {

    id: number;
    bedrijfnaam: string;
    btwNummer: String;
    naam: String;
    voornaam: String;
    address: Address;

    constructor(obj: any) {
        this.id             = obj && obj.id                  || null;
        this.bedrijfnaam    = obj && obj.bedrijfnaam         || null;
        this.btwNummer      = obj && obj.btwNummer           || null;
        this.naam           = obj && obj.naam                || null;
        this.voornaam       = obj && obj.voornaam            || null;
        this.address        = obj && obj.address             || null;
    }
}