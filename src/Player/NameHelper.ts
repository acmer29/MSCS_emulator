import { getRandomInt } from "../Utils/Rng";
import { DebugLogger } from "../Utils/UtilFns";

export class NameHelper {
    private _staticNames: string[];
    private _names: string[] = [];
    private _usedNameMap: Map<number, string>;

    constructor(nameSource: string[]) {
        this._staticNames = nameSource;
        this._usedNameMap = new Map<number, string>;
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
            DebugLogger("Name not exist for id " + id);
            return "";
        }
    }
}