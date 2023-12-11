import { Player } from "../Player/Player";

export class Event {
    private _id: number;
    private _descriptions: string[];
    private _options: Map<number, string[]>; 
    private _handler: (player: Player, context: any) => Map<string, string>;

    constructor(
        id: number,
        descriptions: string[],
        options: Map<number, string[]>,
        handler: (player: Player, context: any) => Map<string, string>) {
        this._id = id;
        this._descriptions = descriptions;
        this._options = options;
        this._handler = handler;
    }

    set id(value: number) {
        this._id = value;
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

    set options(value: Map<number, string[]>) {
        this._options = value;
    }

    get options() {
        return this._options;
    }

    set handler(value: (player: Player, context: any) => Map<string, string>) {
        this._handler = value;
    }

    get handler() {
        return this._handler;
    }
}