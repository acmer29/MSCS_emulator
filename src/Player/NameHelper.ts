import { requestYamlFile } from "../Utils/RequestYamlFile";
import { getRandomInt } from "../Utils/Rng";

export class NameHelper {
    private _staticNames: string[] = [];
    private _names: string[] = [];
    private _usedNameMap: Map<number, string>;

    constructor() {
        this._usedNameMap = new Map<number, string>();
    }

    async init(fileName: string) {
        await this.parseNames(fileName);
        this.reset();
    }

    reset(): void {
        this._names = this._staticNames;
    }

    getNextName(defaultName: string): string {
        if (this._names.length == 0) return defaultName;
        let res: string = this._names[getRandomInt(this._names.length)];
        this._names = this._names.filter((name) => name != res);
        return res;
    }

    registerName(id: number, name: string) {
        if (this._names.includes(name)) {
            this._names = this._names.filter((exist) => exist != name);
        }
        this._usedNameMap.set(id, name);
    }

    retrieveName(id: number) {
        if (this._usedNameMap.has(id)) {
            return this._usedNameMap.get(id);
        } else {
            console.log("Name not exist for id " + id);
            return "";
        }
    }

    private async parseNames(name: string): Promise<void> {
        let fileName = "/miscellaneous/" + name + ".yaml";
        let yamlObject = await requestYamlFile(fileName);
        this._staticNames = yamlObject.names;
        return new Promise<void>((resolve, reject) => {
            if (this._staticNames.length == Object.keys(yamlObject.names).length) {
                resolve();
            } else {
                reject();
            }
        });
    }
}