import { Parameter } from "../Player/Parameter";
import { LanguageFlag } from "../Game/LanguageFlag";
import { getUiText, getUiRoundText, RULE_HTML_EN, RULE_TEXT_ZH } from "./Static/UiTexts";
import { DisplayNumber } from "../Utils/UtilFns";
import { SuThemePrinter } from "./SUTheme";

export class UiManager {
    private _lang: LanguageFlag = new LanguageFlag();

    private _lastParameter: Parameter = new Parameter();
    private _lastRoundNumber: number = 0;
    private _lastAttributeStrings: string[][] = [];
    private _lastDescriptions: string[] = [];
    private _lastOptions: Map<number, string[]> = new Map();

    private _suThemePrinter: SuThemePrinter = new SuThemePrinter();

    constructor(lang: LanguageFlag = new LanguageFlag()) {
        this.resetLang(lang);
        this.resetFrame();
        this.printFrame();
        this.printRuleModal();
    }
    
    setLang(lang: LanguageFlag) {
        this._lang = lang;
    }
    
    resetLang(lang: LanguageFlag): void {
        this._lang = lang;
        let langButton = document.getElementById("lang-switch-checkbox")!;
        langButton.onclick = () => {
            this._lang.lang = !this._lang.lang;
            // Re-print the UI.
            this.printFrame();
            this.printParameter(this._lastParameter);
            this.printTime(this._lastRoundNumber);
            this.printAttributes(this._lastAttributeStrings);
            this.reprintEvent();
            this.reprintRuleModal();
        }
    }

    resetFrame(): void {
        this.clearContainer(document.getElementById("study-key-span")!);
        this.clearContainer(document.getElementById("scores-key-span")!);
        this.clearContainer(document.getElementById("coding-key-span")!);
        this.clearContainer(document.getElementById("health-key-span")!);
        this.clearContainer(document.getElementById("attribute-key-span")!);
    }

    reset(): void {
        this.clearContainer(document.getElementById("event-message-box")!);
        this.clearContainer(document.getElementById("event-option-window")!);
        this.clearContainer(document.getElementById("study-value-span")!);
        this.clearContainer(document.getElementById("scores-value-span")!);
        this.clearContainer(document.getElementById("coding-value-span")!);
        this.clearContainer(document.getElementById("health-value-span")!);
        this.clearContainer(document.getElementById("attribute-ul")!);
        this.clearContainer(document.getElementById("time-value-box")!);
        this._suThemePrinter.clearSuTheme();
    }

    printSuTheme(): void {
        this._suThemePrinter.printSuTheme();
    }
    
    printFrame(): void {
        document.getElementById("study-key-span")!.innerHTML = getUiText("study", this._lang);
        document.getElementById("scores-key-span")!.innerHTML = getUiText("score", this._lang);
        document.getElementById("coding-key-span")!.innerHTML = getUiText("coding", this._lang);
        document.getElementById("health-key-span")!.innerHTML = getUiText("health", this._lang);
        document.getElementById("attribute-key-span")!.innerHTML = getUiText("attribute", this._lang);
        document.getElementById("rule-btn")!.innerHTML = getUiText("rule", this._lang);
        document.getElementById("rule-btn-close")!.innerHTML = getUiText("rule-close", this._lang);
    }

    async printAndSetupEvent(descriptions: string[], options: Map<number, string[]>): Promise<number> {
        // Update event description and options.
        this._lastDescriptions = descriptions;
        this._lastOptions = options;
        // Print event description.
        let eventDescriptionBox = document.getElementById("event-message-box")!;
        eventDescriptionBox.innerHTML = descriptions[this._lang.lang ? 0 : 1];
        
        // Setup and print event options.
        let eventOptionsDiv = document.getElementById("event-option-window")!;
        let clickPromises: Promise<number>[] = [];
        for(let [nextEventId, [optionTextEn, optionTextZh]] of options.entries()) {
            let nextEventAddr = document.createElement("a");
            nextEventAddr.text = this._lang.lang ? optionTextEn : optionTextZh;
            nextEventAddr.dataset.eventid = nextEventId.toString();
            nextEventAddr.className ="event-option-btn";
            eventOptionsDiv.appendChild(nextEventAddr);
            let onclickPromise = new Promise<number>(resolve => {
                nextEventAddr.onclick = () => {
                    this.clearContainer(eventOptionsDiv);
                    resolve(+(nextEventAddr.dataset.eventid!));
                }
            })
            clickPromises.push(onclickPromise);
        }
        return Promise.any(clickPromises);
    }

    reprintEvent(): void {
        let eventDescriptionBox = document.getElementById("event-message-box")!;
        eventDescriptionBox.innerHTML = this._lastDescriptions[this._lang.lang ? 0 : 1];
        let eventOptionsDiv = document.getElementById("event-option-window")!;
        for (let optionRaw of eventOptionsDiv.children) {
            let option: HTMLAnchorElement = optionRaw as HTMLAnchorElement;
            let optionIndex: number = +(option.dataset.eventid!);
            let options: string[] = this._lastOptions.get(optionIndex)!
            option.text = this._lang.lang ? options[0] : options[1];
        }
    }

    printParameter(parameter: Parameter): void {
        // Update the last parameter.
        this._lastParameter = parameter;
        // Update study value.
        let studyValueSpan = document.getElementById("study-value-span")!;
        studyValueSpan.innerHTML = DisplayNumber(parameter.study);
        // Update scores value.
        let scoresValueSpan = document.getElementById("scores-value-span")!;
        scoresValueSpan.innerHTML = this.scoreValueToDisplay(parameter.scores);
        // Update coding value.
        let codingValueSpan = document.getElementById("coding-value-span")!;
        let codingDisplayValue = this.codingValueToDisplay(parameter.coding);
        codingValueSpan.innerHTML = codingDisplayValue;
        // Update health value.
        let healthValueSpan = document.getElementById("health-value-span")!;
        healthValueSpan.innerHTML = DisplayNumber(parameter.health);
    }

    printAttributes(attributeStrings: string[][]): void {
        // Update the last attribute strings.
        this._lastAttributeStrings = attributeStrings;
        let attributeUl = document.getElementById("attribute-ul")!;
        this.clearContainer(attributeUl);
        for(let attributeString of attributeStrings) {
            let attributeStringText = document.createElement("li");
            attributeStringText.className = "diamond";
            attributeStringText.innerHTML = this._lang.lang ? attributeString[0] : attributeString[1];
            attributeUl.appendChild(attributeStringText);
        }
    }

    printTime(round: number): void {
        // Update the last round number.
        this._lastRoundNumber = round;
        let timeValueBox = document.getElementById("time-value-box")!;
        timeValueBox.innerHTML = this.roundToDisplay(round, this._lang);
    }

    printRuleModal(): void {
        let ruleBtn = document.getElementById("rule-btn")!;
        let ruleModal = document.getElementById("rule-modal-window")!;
        let ruleCloseBtn = document.getElementById("rule-btn-close")!;
        ruleBtn.onclick = () => {
            ruleModal.style.display = "block";
        };
        ruleCloseBtn.onclick = () => {
            ruleModal.style.display = "none";
        };
        window.onclick = function(event) {
            if (event.target == ruleModal) {
              ruleModal.style.display = "none";
            }
        }
        this.reprintRuleModal();
    }

    reprintRuleModal(): void {
        let ruleModalTextWindow = document.getElementById("rule-modal-text-window")!;
        ruleModalTextWindow.innerHTML = this._lang.lang ? RULE_HTML_EN : RULE_TEXT_ZH;
    }

    private scoreValueToDisplay(scores: string[]): string {
        let tagStart: string = "<span>", tagEnd: string = "</span>";
        if (scores.length == 0) {
            let defaultScore: string = this._lang.lang ? "N/A" : "无";
            return tagStart +  defaultScore + tagEnd;
        } else {
            let res: string = "";
            for (let i = 0; i < scores.length; ++i) {
                if (i != 0) {
                    res += ", ";
                }
                res += tagStart + scores[i] + tagEnd;
            }
            return res;
        }
    }

    private codingValueToDisplay(value: number): string {
        if (value <= 4) return this._lang.lang ? "Newbie" : "菜鸡";
        if (value <= 16) return this._lang.lang ? "Normal" : "普通";
        if (value <= 32) return this._lang.lang ? "Experienced" : "熟练";
        if (value <= 64) return this._lang.lang ? "Master" : "大师";
        else return this._lang.lang ? "GrandMaster" : "宗师";
    }

    private roundToDisplay(value: number, lang: LanguageFlag): string {
        return getUiRoundText(value, lang);
    }

    private clearContainer(container: HTMLElement): void {
        while(container.firstChild) {
            container.removeChild(container.lastChild!);
        }
    }
}