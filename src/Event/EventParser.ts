import { Event } from "./Event";
import { requestYamlFile } from "../Utils/RequestYamlFile";

export async function parseEvent(eventId: number): Promise<Event> {
    let fileName = "/events/" + eventId.toString() + ".yaml";
    let yamlObject = await requestYamlFile(fileName);

    let optionMap: Map<number, string> = new Map<number, string>();
    for (let [key, value] of Object.entries(yamlObject.event.options)) {
        let numericKey: number = typeof key === "number" ? key : +key;
        let stringVar: string = typeof value === "string" ? value : "";
        optionMap.set(numericKey, stringVar);
    }

    let rarity: number = 0;
    if (yamlObject.event.rarity !== undefined) {
        rarity = +(yamlObject.event.rarity);
    }
    return new Event(yamlObject.event.id, yamlObject.event.descriptions, optionMap, rarity);
}