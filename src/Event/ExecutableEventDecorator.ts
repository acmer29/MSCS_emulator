import { Player } from "../Player/Player";
import { Event } from "./Event";
import { SimpleTemplateRender } from "../Utils/SimpleTemplateRender";
import { JOBHUNTING_EVENT_ID, NORMAL_EVENT_ID } from "../Constant/EventContants";
import { isInVacation } from "../Constant/CalendarConstants";
import { ExecutableEvent } from "./ExecutableEvent";
import { SUMMER_I_ROUNDS } from "../Constant/RoundConstants";

export class ExecutableEventDecorator {
    private _render: SimpleTemplateRender;

    constructor() {
        this._render = new SimpleTemplateRender();
    }

    decorateEvent(exeEvent: ExecutableEvent, player: Player, vars: Map<string, string>): void {
        let renderedDescriptions = exeEvent.event.descriptions.map((description) => description = this.stringRender(description, vars));
        
        let renderedOptions = new Map<number, string>();
        for (let [key, value] of exeEvent.event.options.entries()) {
            renderedOptions.set(key, this.stringRender(value, vars));
        }
        if (exeEvent.event.id == NORMAL_EVENT_ID) {
            this.optionDecorator1(renderedOptions, player);
        }
        
        if (exeEvent.event.id == JOBHUNTING_EVENT_ID) {
            this.optionDecorator7(renderedOptions, player);
        }

        exeEvent.event.descriptions = renderedDescriptions;
        exeEvent.event.options = renderedOptions;
    }

    private stringRender(input: string, vars: Map<string, string>): string {
        return this._render.render(input, vars);
    }

    private optionDecorator1(options: Map<number, string>, player: Player): Map<number, string> {
        // In vacation, study is unavailable.
        if (isInVacation(player.round)) {
            options.delete(1);
        }
        // If not have internship, then cannot work.
        if (!player.attributeIds.includes(11)) {
            options.delete(20);
        }
        return options
    }

    private optionDecorator7(options: Map<number, string>, player: Player): Map<number, string> {
        // If before summer I, only intern interview is available.
        if (SUMMER_I_ROUNDS.filter((round) => round <= player.round).length == 0) {
            options.delete(8);
        } else {
            options.delete(21);
        }
        return options;
    }
}