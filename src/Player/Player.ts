import { AttributeManager } from "../Attribute/AttributeManager";
import { END_ROUND, SUMMER_I_ROUNDS } from "../Constant/RoundConstants";
import { Parameter } from "./Parameter"
import { PlayerStatus } from "../Constant/PlayerConstants";
import { NameHelper } from "./NameHelper";

export class Player {
    private _parameter: Parameter;
    private _status: PlayerStatus;
    private _round: number;
    private _roundResultEventQueue: [number, number, any][];
    private _attributeManager: AttributeManager;
    private _eventNum: number;
    private _courseNameHelper: NameHelper;
    private _companyNameHelper: NameHelper;
    private _internOffers: string[];
    private _offers: string[];
    
    constructor(
        parameter: Parameter = new Parameter(),
        status: PlayerStatus = PlayerStatus.ALIVE,
        round: number = -1,
        eventNum: number = 0) {
        this._parameter = parameter;
        this._status = status;
        this._round = round;
        this._attributeManager = new AttributeManager();
        this._roundResultEventQueue = [];
        this._eventNum = eventNum;
        this._courseNameHelper = new NameHelper();
        this._companyNameHelper = new NameHelper();
        this._internOffers = [];
        this._offers = []

        // These names are not needed immidiately after reset or instantiation, so can be waited.
        this._courseNameHelper.init("course_names");
        this._companyNameHelper.init("company_names");
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

    get attributeStrings(): string[] {
        return this._attributeManager.displayVisibleActivatedAttribute();
    }

    get eventNum(): number {
        return this._eventNum;
    }

    set eventNum(value: number) {
        this._eventNum = value;
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

    set internOffers(value: string[]) {
        this._internOffers = value;
    }

    get offers() {
        return this._offers;
    }

    set offers(value: string[]) {
        this._offers = value;
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

    maintainCareer() {
        // Clear used companies, onsite is a fresh one.
        if (this.round == SUMMER_I_ROUNDS[0]) {
            this.companyNameHelper.reset();
            if (this._internOffers.length > 0) {
                let finalChoice: number = 0;
                // TODO: Get the answer whose id is smallest in company list.
                this._internOffers = [this._internOffers[0]];
                this._companyNameHelper.registerName(this.round, this._internOffers[0]);
            }
        }
        console.log("intern offers are: ");
        console.log(this._internOffers);
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
        this.eventNum = 0;
        this._companyNameHelper.reset();
        this._courseNameHelper.reset();
        this._internOffers = [];
        this._offers = [];
    }
}