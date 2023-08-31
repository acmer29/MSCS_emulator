import { Player } from "../Player/Player";
import { SUMMER_I_ROUNDS } from "./RoundConstants";

export const GIFTED_ATTRIBUTE_IDS: number[] = [0, 1, 2, 3, 4, 6, 7, 8, 9, 14, 15];
export const PERSONAILITY_ATTRIBUTE_IDS: number[] = [14, 15];

export const MUTURAL_EXCLUSIVE_ATTRIBUTE_GROUPS: number[][] = [
    [0, 1], // Gifted coding attributes.
    [2, 3], // Gifted health attributes.
    [4, 5, 6], // Gifted school attributes.
    [7, 8], // Gifted location attributes.
    [8, 9], // There is no nameless village near Silicon Vally.
    [14, 15], // Gifted personaility attributes.
];

// A persistent handler returns if attribute is persist with given player status.
export const PERSISTENT_HANDLER_MAP: Map<number, (player: Player) => boolean> = 
    new Map<number, (player: Player) => boolean>([
    [0, defaultTrueHandler],
    [1, defaultTrueHandler],
    [2, defaultTrueHandler],
    [3, defaultTrueHandler],
    [4, defaultTrueHandler],
    [5, defaultTrueHandler],
    [6, defaultTrueHandler],
    [7, defaultTrueHandler],
    [8, defaultTrueHandler],
    [9, defaultTrueHandler],
    [10, persistentHandler10],
    [11, persistentHandler11],
    [12, defaultTrueHandler],
    [13, defaultTrueHandler],
    [14, defaultTrueHandler],
    [15, defaultTrueHandler],
]);

// A trigger handler returns if attribute is triggered with given parameter under given event.
export const TRIGGER_HANDLER_MAP: Map<number, (type: string, eventId: number) => boolean> = new Map<number, (type: string, eventId: number) => boolean>([
    [0, triggerHandler0],
    [1, triggerHandler0],
    [2, defaultTrueHandler],
    [3, defaultTrueHandler],
    [4, defaultTrueHandler],
    [5, defaultTrueHandler],
    [6, defaultTrueHandler],
    [7, defaultTrueHandler],
    [8, defaultTrueHandler],
    [9, defaultTrueHandler],
    [10, defaultTrueHandler],
    [11, defaultTrueHandler],
    [12, defaultTrueHandler],
    [13, defaultTrueHandler],
    [14, defaultFalseHandler],
    [15, defaultFalseHandler],
]);

function defaultTrueHandler(): boolean {
    return true;
}

function defaultFalseHandler(): boolean {
    return false;
}

function triggerHandler0(type: string, eventId: number): boolean {
    if (type != "coding") return false;
    return eventId == 3 ? true : false;
}

function persistentHandler10(player: Player): boolean {
    return SUMMER_I_ROUNDS.filter((round) => player.round >= round).length == 0 ? true : false;
}

function persistentHandler11(player: Player): boolean {
    return SUMMER_I_ROUNDS.filter((round) => player.round == round).length == 1 ? true : false;
}