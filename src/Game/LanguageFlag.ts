export class LanguageFlag {
    // true for English (EN-en), false for Chinese (ZH-zh)
    private _lang: boolean;

    constructor(lang: boolean = true) {
        this._lang = lang;
    }

    get lang(): boolean {
        return this._lang;
    }

    set lang(value: boolean) {
        this._lang = value;
    }
}