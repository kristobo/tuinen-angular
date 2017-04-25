export class Customer {

    id: number;
    bedrijfnaam: string;
    btwNummer: String;
    naam: String;
    voornaam: String;

    constructor(obj: any) {
        this.id             = obj && obj.id                  || null;
        this.bedrijfnaam    = obj && obj.bedrijfnaam         || null;
        this.btwNummer    = obj && obj.btwNummer             || null;
    }
}