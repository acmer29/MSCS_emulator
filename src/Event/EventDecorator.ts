import { Player } from "../Player/Player";
import { SimpleTemplateRender } from "../Utils/SimpleTemplateRender";
import { Event } from "./Event";
import { OPTION_MASK_MAP } from "./OptionsMaskMap";


export class EventDecorator {
    private _render: SimpleTemplateRender;

    constructor() {
        this._render = new SimpleTemplateRender();
    }

    decorateEvent(event: Event, player: Player, vars: Map<string, string>): void {
        let renderedOptions = new Map<number, string>();
        for (let [key, value] of event.options.entries()) {
            renderedOptions.set(key, this.stringRender(value, vars));
        }

        if (OPTION_MASK_MAP.has(event.id)) {
            console.log("masking the options");
            renderedOptions = OPTION_MASK_MAP.get(event.id)!(renderedOptions, player);
        }
        event.options = renderedOptions;
        event.description = this.stringRender(event.description, vars);
    }

    private stringRender(input: string, vars: Map<string, string>): string {
        return this._render.render(input, vars);
    }
}