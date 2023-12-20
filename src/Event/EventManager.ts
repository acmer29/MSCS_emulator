import { Player } from "../Player/Player"
import { Event } from "./Event";
import { UNEXECUTABLE_EVENT_IDS } from "./EventConstants";
import { EVENT_HANDLER_MAP, noopHandler } from "./EventHandlerMap";
import { RANDOM_EVENT_AVAILABILITY_MAP, RANDOM_EVENT_RARITY } from "./RandomEventHelper";
import { getRandomInt } from "../Utils/Rng";
import { DESCRIPTION_TEXTS_MAP } from "./Static/DescriptionTexts";
import { OPTION_TEXT_MAP } from "./Static/OptionTexts";
import { EventDecorator } from "./EventDecorator";
import { DebugLogger } from "../Utils/UtilFns";

export class EventManager {
    private _usedRandomEvent: number[] = [];
    private _render: EventDecorator;

    constructor() {
        this._render = new EventDecorator();
    }

    executeEvent(id: number, player: Player, context: any = null): [string[], Map<number, string[]>] {
        let event: Event = this.serveEvent(id);
        let vars: Map<string, string> = event.handler(player, context);
        this._render.decorateEvent(event, player, vars);
        player.historyEvents.push([id, vars]);
        return [event.descriptions, event.options];
    }

    serveEvent(id: number): Event {
        DebugLogger("Demands " + id);
        if (UNEXECUTABLE_EVENT_IDS.includes(id)) {
            DebugLogger("Unexecutable event " + id + " should not be served, please debug");
            return new Event(id, ["Unexecutable event " + id.toString(), ""], new Map<number, string[]>(), noopHandler);
        }
        
        let descriptions: string[] = DESCRIPTION_TEXTS_MAP.get(id)!;
        let optionsRaw: [number, string, string][] = OPTION_TEXT_MAP.get(id)!;
        let options: Map<number, string[]> = new Map<number, string[]>();
        for (let [nextId, textEn, textZh] of optionsRaw) {
            options.set(nextId, [textEn, textZh]);
        }
        let handler: (player: Player, context: any) => Map<string, string> = noopHandler;
        if (!EVENT_HANDLER_MAP.has(id)) {
            DebugLogger(id + " handler does not exist!");
        } else {
            DebugLogger("Serving " + id);
            handler = EVENT_HANDLER_MAP.get(id)!;
        }
        let event = new Event(id, descriptions, options, handler);
        return event;
    }

    getNextRandomEvent(player: Player): number {
        let rarity: number = getRandomInt(15);
        let target: RANDOM_EVENT_RARITY = 
            rarity < 1 ? RANDOM_EVENT_RARITY.LOW : 
            rarity < 3 ? RANDOM_EVENT_RARITY.MEDIUM : 
            rarity < 7 ? RANDOM_EVENT_RARITY.MEDIUM_HIGH : RANDOM_EVENT_RARITY.HIGH;
        DebugLogger("require rarity: " + rarity);
        let candidate: number[] = [];
        for (let [id, handler] of RANDOM_EVENT_AVAILABILITY_MAP.entries()) {
            let tmp: RANDOM_EVENT_RARITY = handler(player);
            if (!this._usedRandomEvent.includes(id) && (tmp == target || tmp == RANDOM_EVENT_RARITY.MUST)) {
                candidate.push(id);
            }
        }
        DebugLogger("candidates are " + candidate);
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
