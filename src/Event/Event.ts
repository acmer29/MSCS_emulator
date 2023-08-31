export class Event {
    private _id: number;
    private _descriptions: string[];
    private _options: Map<number, string>;
    private _rarity: number;

    constructor(
        id: number, 
        descriptions: string[], 
        options: Map<number, string>, 
        rarity: number = 0) {
        this._id = id;
        this._descriptions = descriptions;
        this._options = options;
        this._rarity = rarity;
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

    set rarity(value: number) {
        this._rarity = value;
    }

    get rarity() {
        return this._rarity;
    }
}