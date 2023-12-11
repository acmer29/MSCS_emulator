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
        let renderedOptions = new Map<number, string[]>();
        for (let [key, [valueEn, valueZh]] of event.options.entries()) {
            renderedOptions.set(key, [this._render.render(valueEn, vars), this._render.render(valueZh, vars)]);
        }

        if (OPTION_MASK_MAP.has(event.id)) {
            console.log("masking the options");
            renderedOptions = OPTION_MASK_MAP.get(event.id)!(renderedOptions, player);
        }
        event.options = renderedOptions;
        let renderedDescriptionEn: string = this._render.render(event.descriptions[0], vars);
        let renderedDescriptionZh: string = this._render.render(event.descriptions[1], vars);
        event.descriptions = [renderedDescriptionEn, renderedDescriptionZh];
    }
}