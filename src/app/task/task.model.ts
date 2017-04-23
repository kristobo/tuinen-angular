export class Task {

    id: number;
    title: string;
    klantid: number;

    constructor(obj: any) {
        this.id         = obj && obj.id         || null;
        this.title      = obj && obj.title      || null;
        this.klantid    = obj && obj.klantid    || null;
    }
}