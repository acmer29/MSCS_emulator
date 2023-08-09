export class Event {
    private _id: number;
    private _descriptions: string[];
    private _options: Map<number, string>;

    constructor(
        id: number, 
        descriptions: string[], 
        options: Map<number, string>) {
        this._id = id;
        this._descriptions = descriptions;
        this._options = options;
    }

    get id() {
        return this._id;
    }

    set descriptions(value: string[]) {
        this._descriptions = value;
    }

    get descriptions() {
        return this._descriptions;
    }

    set options(value: Map<number, string>) {
        this._options = value;
    }

    get options() {
        return this._options;
    }
}