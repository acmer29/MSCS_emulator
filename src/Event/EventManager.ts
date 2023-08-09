import { Player } from "../Player/Player"
import { ExecutableEvent } from "./ExecutableEvent";
import { parseEvent } from "./EventParser";
import { Event } from "./Event";
import { UNEXECUTABLE_EVENT_IDS } from "../Constant/EventContants";
import { EVENT_HANDLER_MAP, noopHandler } from "./EventHandlerMap";

export class EventManager {
    private _eventMap: Map<number, (player: Player) => Promise<Map<string, string>>>;

    constructor() {
        this._eventMap = EVENT_HANDLER_MAP;
    }

    async serveExecutableEvent(id: number): Promise<ExecutableEvent> {
        console.log("Demands " + id);
        if (UNEXECUTABLE_EVENT_IDS.includes(id)) {
            console.log("Unexecutable event " + id + " should not be served, please debug");
            return new ExecutableEvent(new Event(id, [], new Map<number, string>()), noopHandler);
        }

        let event = await parseEvent(id);
        console.log("======");
        console.log(event);
        console.log(event.options);
        console.log("======");
        let handler = null;
        if (!this._eventMap.has(event.id)) {
            console.log(event.id + " handler does not exist!");
            handler = noopHandler;
        } else {
            console.log("Serving " + event.id);
            handler = this._eventMap.get(event.id)!;
        }
        return new ExecutableEvent(event, handler);
    }
}
