const CONTROLLER_LEFT_START: string = "{{";
const CONTROLLER_RIGHT_END: string = "}}";
const CONDITION_IF: string = "IF";
const CONDITION_ELSE: string = "ELSE";
const CONDITION_ENDIF: string = "FI";
export const CONDITION_FALSE: string = "CONDITION_FALSE";
export const CONDITION_TRUE: string = "CONDITION_TRUE";

const TEMPLATE_KEYWORDS: string[] = [
    CONDITION_IF, CONDITION_ELSE, CONDITION_ENDIF, CONDITION_FALSE, CONDITION_TRUE,
];


export class SimpleTemplateRender {
    private _tokens: string[];

    constructor() {
        this._tokens = [];
    }

    render(input: string, variableMap: Map<string, string>): string {
        this._tokens = [];
        let index: number = 0;
        while(index < input.length) {
            let next = input.indexOf(CONTROLLER_LEFT_START, index);
            if (next == -1) {
                this._tokens.push(input.slice(index));
                break;
            } else {
                let token: string = input.slice(index, next);
                if (token != "") {
                    this._tokens.push(token);
                }
                let nextEnd = input.indexOf(CONTROLLER_RIGHT_END, next);
                let condition: string = input.slice(next + CONTROLLER_LEFT_START.length, nextEnd).trim();
                if (condition == CONDITION_ENDIF) {
                    this.tokensEval();
                } else if (condition.startsWith(CONDITION_IF)) {
                    this._tokens.push(CONTROLLER_LEFT_START + variableMap.get(condition.slice(CONDITION_IF.length + 1, condition.length).trim())! + CONTROLLER_RIGHT_END);
                } else {
                    this._tokens.push(variableMap.has(condition) ? variableMap.get(condition)!.toString() : CONTROLLER_LEFT_START + condition + CONTROLLER_RIGHT_END);
                }
                index = nextEnd + CONTROLLER_RIGHT_END.length;
            }
        }

        let final: string = this._tokens.join('');
        this._tokens = [];
        return final;
    }

    private tokensEval(): void {
        let rhs: string = "";
        while(TEMPLATE_KEYWORDS.filter(
            (keyWord) => this.wrapKeyWord(keyWord) == this._tokens[this._tokens.length - 1]).length == 0) {
            rhs = this._tokens[this._tokens.length - 1] + rhs;
            this._tokens.pop();
        }
        let lhs: string = "";
        if (this._tokens[this._tokens.length - 1] != this.wrapKeyWord(CONDITION_ELSE)) {
            lhs = rhs;
            rhs = "";
        } else {
            this._tokens.pop();
            while(TEMPLATE_KEYWORDS.filter(
                (keyWord) => this.wrapKeyWord(keyWord) == this._tokens[this._tokens.length - 1]).length == 0) {
                lhs = this._tokens[this._tokens.length - 1] + lhs;
                this._tokens.pop();
            }
        }
        let condition: string = this._tokens[this._tokens.length - 1];
        this._tokens.pop();

        this._tokens.push(condition == this.wrapKeyWord(CONDITION_TRUE) ? lhs : rhs);
    }

    private wrapKeyWord(keyWord: string): string {
        return CONTROLLER_LEFT_START + keyWord + CONTROLLER_RIGHT_END;
    }
}