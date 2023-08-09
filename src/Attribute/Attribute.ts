export class Attribute {
    private _id: number;
    private _description: string;
    private _isVisible: boolean;
    private _parameterBuffMap: Map<string, number>;
    private _parameterDebuffMap: Map<string, number>;

    set id(value: number) {
        this._id = value;
    }

    get id() {
        return this._id;
    }

    set description(value: string) {
        this._description = value;
    }

    get description() {
        return this._description;
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
        description: string,
        isVisible: boolean, 
        parameterBuffMap: Map<string, number>,
        parameterDebuffMap: Map<string, number>) {
        this._id = id;
        this._description = description;
        this._isVisible = isVisible;
        this._parameterBuffMap = parameterBuffMap;
        this._parameterDebuffMap = parameterDebuffMap;
    }
}