import { Player } from "../Player/Player"
import { ExecutableEvent } from "./ExecutableEvent";
import { parseEvent } from "./EventParser";
import { Event } from "./Event";
import { UNEXECUTABLE_EVENT_IDS } from "../Constant/EventConstants";
import { EVENT_HANDLER_MAP, noopHandler } from "./EventHandlerMap";
import { RANDOM_EVENT_AVAILABILITY_MAP, RANDOM_EVENT_RARITY } from "./RandomEventHelper";
import { getRandomInt } from "../Utils/Rng";

export class EventManager {
    private _eventHandlerMap: Map<number, (player: Player, context: any) => Promise<Map<string, string>>>;
    private _randomEventAvailabilityMap: Map<number, (player: Player) => RANDOM_EVENT_RARITY>;
    private _usedRandomEvent: number[] = [];


    constructor() {
        this._eventHandlerMap = EVENT_HANDLER_MAP;
        this._randomEventAvailabilityMap = RANDOM_EVENT_AVAILABILITY_MAP;
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
        console.log("======");
        let handler = null;
        if (!this._eventHandlerMap.has(event.id)) {
            console.log(event.id + " handler does not exist!");
            handler = noopHandler;
        } else {
            console.log("Serving " + event.id);
            handler = this._eventHandlerMap.get(event.id)!;
        }
        return new ExecutableEvent(event, handler);
    }

    getNextRandomEvent(player: Player): number {
        let rarity: number = getRandomInt(7);
        let target: RANDOM_EVENT_RARITY = 
            rarity < 1 ? RANDOM_EVENT_RARITY.LOW : rarity < 3 ? RANDOM_EVENT_RARITY.MEDIUM : RANDOM_EVENT_RARITY.HIGH;
        console.log("require rarity: " + rarity);
        let candidate: number[] = [];
        for (let [id, handler] of this._randomEventAvailabilityMap.entries()) {
            let tmp: RANDOM_EVENT_RARITY = handler(player);
            if (!this._usedRandomEvent.includes(id) && (tmp == target || tmp == RANDOM_EVENT_RARITY.MUST)) {
                candidate.push(id);
            }
        }
        console.log("candidates are " + candidate);
        if (candidate.length == 0) {
            return -1;
        } else {
            let finalChoice: number = getRandomInt(candidate.length);
            this._usedRandomEvent.push(candidate[finalChoice]);
            return candidate[finalChoice];
        }
    }

    resetUsedRandomEvent() {
        this._usedRandomEvent = [];
    }
}
