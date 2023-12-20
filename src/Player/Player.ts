import { AttributeManager } from "../Attribute/AttributeManager";
import { END_ROUND, SUMMER_I_ROUNDS } from "../Game/RoundConstants";
import { Parameter } from "./Parameter"
import { PlayerStatus } from "./PlayerConstants";
import { NameHelper } from "./NameHelper";
import { COURSE_NAME_TEXTS } from "./Static/CourseNameTexts";
import { COMPANY_NAME_TEXTS } from "./Static/CompanyNameTexts";
import { ATTRIBUTE_TEXT_MAP } from "../Attribute/Static/AttributeTexts";
import { DebugLogger } from "../Utils/UtilFns";

export class Player {
    private _parameter: Parameter;
    private _status: PlayerStatus;
    private _round: number;
    private _roundResultEventQueue: [number, number, any][];
    private _attributeManager: AttributeManager;
    private _courseNameHelper: NameHelper;
    private _companyNameHelper: NameHelper;
    private _internOffers: string;
    private _offers: string;
    private _historyEvents: [number, any][];
    
    constructor(
        parameter: Parameter = new Parameter(),
        status: PlayerStatus = PlayerStatus.ALIVE,
        round: number = -1,
        historyEvents: [number, any][] = []) {
        this._parameter = parameter;
        this._status = status;
        this._round = round;
        this._attributeManager = new AttributeManager();
        this._roundResultEventQueue = [];
        this._courseNameHelper = new NameHelper(COURSE_NAME_TEXTS);
        this._companyNameHelper = new NameHelper(COMPANY_NAME_TEXTS);
        this._internOffers = "";
        this._offers = "";
        this._historyEvents = historyEvents;
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

    set roundResultEventQueue(value: [number, number, any][]) {
        this._roundResultEventQueue = value;
    }

    get attributeIds(): number[] {
        return this._attributeManager.getActivatedAttributeIds();
    }

    get attributeStrings(): string[][] {
        let attributeStrings: string[][] = [];
        for (let [titleEn, titleZh] of this._attributeManager.getVisibleActivatedAttributeDescriptions()) {
            if (titleEn == ATTRIBUTE_TEXT_MAP.get(10)![0] || 
                titleEn == ATTRIBUTE_TEXT_MAP.get(12)![0]) {
                titleEn += " (" + this._internOffers + ")";
                titleZh += " (" + this._internOffers + ")";
            }
            if (titleEn == ATTRIBUTE_TEXT_MAP.get(13)![0]) {
                titleEn += " (" + this._offers + ")";
                titleZh += " (" + this._offers + ")";
            }
            attributeStrings.push([titleEn, titleZh]);
        }
        return attributeStrings;
    }

    get courseNameHelper() {
        return this._courseNameHelper;
    }

    set courseNameHelper(value: NameHelper) {
        this._courseNameHelper = value;
    }

    get companyNameHelper() {
        return this._companyNameHelper;
    }

    set companyNameHelper(value: NameHelper) {
        this._companyNameHelper = value;
    }

    get internOffers() {
        return this._internOffers;
    }

    set internOffers(value: string) {
        this._internOffers = value;
    }

    get offers() {
        return this._offers;
    }

    set offers(value: string) {
        this._offers = value;
    }

    get historyEvents() {
        return this._historyEvents;
    }

    set historyEvents(value: [number, any][]) {
        this._historyEvents = value;
    }

    checkVitals() {
        if (this._parameter.health <= 0) {
            this._status = PlayerStatus.DIED;
        } else if (this._parameter.scores.filter(score => score == "F").length >= 1) {
            this._status = PlayerStatus.DROPPED;
        } else if (this._round >= 40 && 
                this.attributeIds.filter((attribute) => attribute == 12 || attribute == 13).length > 0) {
            this._status = PlayerStatus.HAPPY_ENDING;
        } else if (this._round >= END_ROUND) {
            this._status = PlayerStatus.NO_OFFER;
        }
            
    }

    modifyParameter(type: string, delta: number, eventId: number | null): void {
        let correctedDelta = this._attributeManager.getAttributeAffectOnParameter(type, delta, eventId);
        DebugLogger("Modify on " + type + ", incoming " + delta + ", corrected " + correctedDelta);
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

    assignAttribute(attributeIds: number[]) {
        this._attributeManager.activateAttribute(attributeIds);
    }

    removeAttribute(attributeIds: number[]) {
        this._attributeManager.disableAttribute(attributeIds);
    }

    maintainAttribute(reset: boolean = false) {
        this._attributeManager.updateActivatedAttributes(this, reset);
    }

    maintainCareer() {
        // Clear used companies, onsite is a fresh one.
        if (this.round == SUMMER_I_ROUNDS[0]) {
            this.companyNameHelper.reset();
            if (this._internOffers.length) {
                this._internOffers = this._internOffers.split(",")[0];
                this._companyNameHelper.registerName(this.round, this._internOffers);
            }
        }
        DebugLogger("intern offers are: ");
        DebugLogger(this._internOffers);
    }

    maintain() {
        this.maintainAttribute();
        this.maintainCareer();
        this.checkVitals();
    }

    reset() {
        this.maintainAttribute(/* reset= */true);
        this.parameter = new Parameter();
        this.round = -1;
        this.status = PlayerStatus.ALIVE;
        this.roundResultEventQueue = [];
        this._companyNameHelper.reset();
        this._courseNameHelper.reset();
        this._internOffers = "";
        this._offers = "";
        this._historyEvents = [];
    }
}