import { PERSISTENT_HANDLER_MAP, TRIGGER_HANDLER_MAP } from "./AttributeConstants";
import { Player } from "../Player/Player";
import { Attribute } from "./Attribute";
import { finalizeParameterDelta } from "./AttributeHelper";
import { ATTRIBUTE_TEXT_MAP } from "./Static/AttributeTexts";

export class AttributeManager {
    private _activatedAttribute: Attribute[];
    
    constructor() {
        this._activatedAttribute = [];
    }

    getActivatedAttributeIds(): number[] {
        return this._activatedAttribute.map((attribute) => attribute.id);
    }

    displayVisibleActivatedAttribute(): string[] {
        let res: string[] = [];
        for(let attribute of this._activatedAttribute) {
            if (attribute.isVisible) {
                res.push(attribute.description);
            }
        }
        return res;
    }
    
    getAttributeAffectOnParameter(type: string, delta: number, eventId: number | null): number {
        console.log("Change parameter " + type + ", delta " + delta + ", event id " + eventId);
        if (eventId == null) return delta;
        let res: number = delta;
        for (let attribute of this._activatedAttribute) {
            if (TRIGGER_HANDLER_MAP.get(attribute.id)!(type, eventId)) {
                // console.log("Attribute " + attribute.description + " triggered");
                if (delta > 0) {
                    // console.log("affecting buff map ");
                    console.log(attribute.parameterBuffMap);
                    res += finalizeParameterDelta(delta, type, attribute.parameterBuffMap);
                } else if (delta < 0) {
                    // console.log("affecting debuff map ");
                    console.log(attribute.parameterDebuffMap);
                    res += finalizeParameterDelta(delta, type, attribute.parameterDebuffMap);
                }
                // console.log("Corrected " + res);
            }
        }
        console.log("Finalized parameter " + type + " to " + res);
        return res;
    }

    disableAttribute(ids: number[]): void {
        this._activatedAttribute = this._activatedAttribute.filter(attribute => !ids.includes(attribute.id));
    }

    activateAttribute(ids: number[]): void {
        for (let id of ids) {
            if (this._activatedAttribute.filter(attribute => attribute.id == id).length != 0) {
                continue;
            }
            let attributeRaw = ATTRIBUTE_TEXT_MAP.get(id)!;
            let title: string = attributeRaw[0];
            let isVisible: boolean = attributeRaw[1];
            let buffMapRaw: number[] = attributeRaw[2];
            let buffMap: Map<string, number> = new Map<string, number>([
                ["study", buffMapRaw[0]],
                ["coding", buffMapRaw[1]],
                ["health", buffMapRaw[2]],
                ["working", buffMapRaw[3]],
                ["interview", buffMapRaw[4]],
            ]);
            let debuffMapRaw: number[] = attributeRaw[3];
            let debuffMapMap: Map<string, number> = new Map<string, number>([
                ["study", debuffMapRaw[0]],
                ["coding", debuffMapRaw[1]],
                ["health", debuffMapRaw[2]],
                ["working", debuffMapRaw[3]],
                ["interview", debuffMapRaw[4]],
            ]);
            let attribute: Attribute = new Attribute(id, title, isVisible, buffMap, debuffMapMap);
            this._activatedAttribute.push(attribute);
        }
    }

    updateActivatedAttributes(player: Player, reset: boolean = false) {
        let attributeToDisable: number[] = []
        for(let attribute of Array.from(this._activatedAttribute)) {
            if (reset == true) {
                attributeToDisable.push(attribute.id);
            } else {
                let persistentHandler = PERSISTENT_HANDLER_MAP.get(attribute.id)!;
                if (!persistentHandler(player)) {
                    attributeToDisable.push(attribute.id);
                }
            }
        }
        this.disableAttribute(attributeToDisable);
    }
}
