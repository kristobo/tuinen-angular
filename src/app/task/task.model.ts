export class Task {

    id: number;
    title: string;
    category: string;

    constructor(obj: any) {
        this.id         = obj && obj.id         || null;
        this.title      = obj && obj.title      || null;
        this.category   = obj && obj.category   || null;
    }
}