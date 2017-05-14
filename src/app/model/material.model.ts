export class Material {

    id: number;
    naam: string;
    eenheidsmaat: string;
    eenheidsprijs: number;
    soort: string;
    hoeveelheid: number;
    opdrachtId: number;

    constructor(obj: any) {
        this.id               = obj && obj.id             || null;
        this.naam             = obj && obj.naam           || null;
        this.eenheidsmaat     = obj && obj.eenheidsmaat   || null;
        this.eenheidsprijs    = obj && obj.eenheidsprijs  || null;
        this.soort            = obj && obj.soort          || null;
        this.hoeveelheid      = obj && obj.hoeveelheid    || null;
        this.opdrachtId       = obj && obj.opdrachtId    || null;
    }
}