import { INITIAL_INTERVIEW_PROBABILITY, INITIAL_STUDY_VALUE, MAX_INTERVIEW_PROBABILITY, MAX_CODING, MAX_HEALTH, MAX_STUDY, MAX_WORKING, INITIAL_HEALTH_VALUE, INITIAL_CODING_VALUE } from "./PlayerConstants";

export class Parameter {
    private _study: number;
    private _coding: number;
    private _health: number;
    private _working: number;
    private _interviewProbability: number;
    private _scores: string[];

    get study() {
        return this._study;
    }

    set study(value: number) {
        this._study = Math.min(value, MAX_STUDY);
    }

    get coding() {
        return this._coding;
    }

    set coding(value: number) {
        this._coding = Math.min(value, MAX_CODING);
    }

    get health() {
        return this._health;
    }

    set health(value: number) {
        this._health = Math.min(value, MAX_HEALTH);
    }

    get working() {
        return this._working;
    }

    set working(value: number) {
        this._working = Math.min(value, MAX_WORKING);
    }

    get interviewProbability() {
        return this._interviewProbability;
    }

    set interviewProbability(value: number) {
        this._interviewProbability = Math.min(value, MAX_INTERVIEW_PROBABILITY);
    }

    get scores() {
        return this._scores;
    }

    set scores(values: string[]) {
        this._scores = values;
    }

    constructor(
        study: number = INITIAL_STUDY_VALUE, 
        coding: number = INITIAL_CODING_VALUE, 
        health: number = INITIAL_HEALTH_VALUE, 
        working: number = 0, 
        interviewProbability: number = 0,
        scores: string[] = []) {
        this._study = study;
        this._coding = coding;
        this._health = health;
        this._working = working;
        this._interviewProbability = interviewProbability;
        this._scores = scores;
    }
}