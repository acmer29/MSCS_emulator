import { Attribute } from "./Attribute";
import { requestYamlFile } from "../Utils/RequestYamlFile";

export async function parseAttribute(attributeName: string): Promise<Attribute> {
    let fileName = "/attributes/" + attributeName + ".yaml";
    let yamlObject = await requestYamlFile(fileName);

    let parameterBuffMap: Map<string, number> = new Map<string, number>();
    for (let [key, value] of Object.entries(yamlObject.attribute.parameterBuffMap)) {
        let stringKey: string = typeof key === "string" ? key : "";
        let numericVar: number = typeof value === "number" ? value : 0;
        parameterBuffMap.set(stringKey, numericVar);
    }
    let parameterDebuffMap: Map<string, number> = new Map<string, number>();
    for (let [key, value] of Object.entries(yamlObject.attribute.parameterDebuffMap)) {
        let stringKey: string = typeof key === "string" ? key : "";
        let numericVar: number = typeof value === "number" ? value : 0;
        parameterDebuffMap.set(stringKey, numericVar);
    }
    return new Attribute(yamlObject.attribute.id, yamlObject.attribute.description, yamlObject.attribute.isVisible, parameterBuffMap, parameterDebuffMap);
}