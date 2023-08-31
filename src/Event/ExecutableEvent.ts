import { Event } from "./Event"
import { Player } from "../Player/Player";

export class ExecutableEvent {
    private _event: Event;
    private _handler: (player: Player, context: any) => Promise<Map<string, string>>;

    constructor(event: Event, handler: (player: Player, context: any) => Promise<Map<string, string>>) {
        this._event = event;
        this._handler = handler;
    }

    set event(value: Event) {
        this._event = value;
    }

    get event() {
        return this._event;
    }

    set handler(value: (player: Player, context: any) => Promise<Map<string, string>>) {
        this._handler = value;
    }

    get handler() {
        return this._handler;
    }
}