import { Player } from "../Player/Player";
import { SimpleTemplateRender } from "../Utils/SimpleTemplateRender";
import { ExecutableEvent } from "./ExecutableEvent";
import { OPTION_MASK_MAP } from "./OptionsMaskMap";


export class ExecutableEventDecorator {
    private _render: SimpleTemplateRender;
    private _optionMaskMap: Map<number, (options: Map<number, string>, player: Player) => Map<number, string>>;

    constructor() {
        this._render = new SimpleTemplateRender();
        this._optionMaskMap = OPTION_MASK_MAP;
    }

    decorateEvent(exeEvent: ExecutableEvent, player: Player, vars: Map<string, string>): void {
        let renderedDescriptions = exeEvent.event.descriptions.map((description) => description = this.stringRender(description, vars));
        
        let renderedOptions = new Map<number, string>();
        for (let [key, value] of exeEvent.event.options.entries()) {
            renderedOptions.set(key, this.stringRender(value, vars));
        }

        if (this._optionMaskMap.has(exeEvent.event.id)) {
            console.log("masking the options");
            renderedOptions = this._optionMaskMap.get(exeEvent.event.id)!(renderedOptions, player);
        }

        exeEvent.event.descriptions = renderedDescriptions;
        exeEvent.event.options = renderedOptions;
    }

    private stringRender(input: string, vars: Map<string, string>): string {
        return this._render.render(input, vars);
    }
}