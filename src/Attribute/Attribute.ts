export class Attribute {
    private _id: number;
    private _descriptions: string[];
    private _isVisible: boolean;
    private _parameterBuffMap: Map<string, number>;
    private _parameterDebuffMap: Map<string, number>;

    set id(value: number) {
        this._id = value;
    }

    get id() {
        return this._id;
    }

    set descriptions(value: string[]) {
        this._descriptions = value;
    }

    get descriptions() {
        return this._descriptions;
    }

    set isVisible(value: boolean) {
        this._isVisible = value;
    }

    get isVisible() {
        return this._isVisible;
    }

    set parameterBuffMap(value: Map<string, number>) {
        this._parameterBuffMap = value;
    }

    get parameterBuffMap() {
        return this._parameterBuffMap;
    }

    set parameterDebuffMap(value: Map<string, number>) {
        this._parameterDebuffMap = value;
    }

    get parameterDebuffMap() {
        return this._parameterDebuffMap;
    }

    constructor(
        id: number,
        descriptions: string[],
        isVisible: boolean, 
        parameterBuffMap: Map<string, number>,
        parameterDebuffMap: Map<string, number>) {
        this._id = id;
        this._descriptions = descriptions;
        this._isVisible = isVisible;
        this._parameterBuffMap = parameterBuffMap;
        this._parameterDebuffMap = parameterDebuffMap;
    }
}