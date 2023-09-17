import { MUTURAL_EXCLUSIVE_ATTRIBUTE_GROUPS } from "./AttributeConstants"

export function getMutualExclueAttributeGroup(attributeId: number): number {
    for (let i = 0; i < MUTURAL_EXCLUSIVE_ATTRIBUTE_GROUPS.length; ++i) {
        if (MUTURAL_EXCLUSIVE_ATTRIBUTE_GROUPS[i].includes(attributeId)) return i;
    }
    return -1;
}

export function finalizeParameterDelta(delta: number, type: string, factors: Map<string, number>): number {
    let res: number = 0;
    for(let [key, value] of factors.entries()) {
        if (key == type) {
            res += delta * value;
            break;
        }
    }
    return res;
}