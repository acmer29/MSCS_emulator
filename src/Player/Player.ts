import { AttributeManager } from "../Attribute/AttributeManager";
import { END_ROUND } from "../Constant/RoundConstants";
import { Parameter } from "./Parameter"
import { MAX_CODING, MAX_STUDY, PlayerStatus } from "../Constant/PlayerConstants";

export class Player {
    private _parameter: Parameter;
    private _status: PlayerStatus;
    private _round: number;
    private _roundResultEventQueue: [number, number][];
    private _attributeManager: AttributeManager;
    
    constructor(
        parameter: Parameter = new Parameter(),
        status: PlayerStatus = PlayerStatus.ALIVE,
        round: number = -1) {
        this._parameter = parameter;
        this._status = status;
        this._round = round;
        this._attributeManager = new AttributeManager();
        this._roundResultEventQueue = [];
    }

    get parameter() {
        return this._parameter;
    }

    set parameter(value: Parameter) {
        this._parameter = value;
    }

    get status() {
        return this._status;
    }

    set status(value: PlayerStatus) {
        this._status = value;
    }

    get round() {
        return this._round;
    }

    set round(value: number) {
        this._round = value;
    }

    get roundResultEventQueue() {
        return this._roundResultEventQueue;
    }

    set roundResultEventQueue(value: [number, number][]) {
        this._roundResultEventQueue = value;
    }

    get attributeIds(): number[] {
        return this._attributeManager.getActivatedAttributeIds();
    }

    get attributeStrings(): string[] {
        return this._attributeManager.displayVisibleActivatedAttribute();
    }

    checkVitals() {
        if (this._parameter.health <= 0) {
            this._status = PlayerStatus.DIED;
        } else if (this._parameter.scores.filter(score => score == "C").length >= 2 || this._parameter.scores.filter(score => score == "F").length >= 1) {
            this._status = PlayerStatus.DROPPED;
        } else if (this._round >= END_ROUND) {
            if (this.attributeIds.filter((attribute) => attribute == 12 || attribute == 13).length > 0) {
                this._status = PlayerStatus.HAPPY_ENDING;
            } else {
                this._status = PlayerStatus.NO_OFFER;
            }
        }
    }

    modifyParameter(type: string, delta: number, eventId: number | null): void {
        let correctedDelta = this._attributeManager.getAttributeAffectOnParameter(type, delta, eventId);
        console.log("Modify on " + type + ", incoming " + delta + ", corrected " + correctedDelta);
        switch (type) {
            case "study":
                this._parameter.study += correctedDelta;
                break;
            case "coding":
                this._parameter.coding += correctedDelta;
                break;
            case "health":
                this._parameter.health += correctedDelta;
                break;
            case "work":
                this._parameter.working += correctedDelta;
                break;
            case "interview":
                this._parameter.interviewProbability += correctedDelta;
            default:
                break;
        }
    }

    async assignAttribute(attributeIds: number[]) {
        await this._attributeManager.activateAttribute(attributeIds);
    }

    removeAttribute(attributeIds: number[]) {
        this._attributeManager.disableAttribute(attributeIds);
    }

    maintainAttribute(reset: boolean = false) {
        this._attributeManager.updateActivatedAttributes(this, reset);
    }
}