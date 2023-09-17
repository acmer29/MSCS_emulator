import { PlayerStatus } from "../Player/PlayerConstants";

export const RANDOM_EVENT_IDS: number[] = [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48];
export const SEMASTER_ONLY_RANDOM_START_EVENT_ID: number[] = [29, 32, 36, 38, 39, 40, 48];
export const INTERN_ONLY_RANDOM_START_EVENT_ID: number[] = [44, 45];
export const ALL_TIME_RANDOM_START_EVENT_ID: number[] = [];

export const RESULT_EVENT_IDS: number[] = [9, 10, 11, 12];

export const GAME_START_EVENT_ID: number = 100;

export const NORMAL_EVENT_ID: number = 0;

export const COMPULSORY_EVENT_IDS: number[] = [5, 6, 24, 25, 26];
export const FINAL_TEST_START_EVENT_ID = 5;
export const RETURN_OFFER_EVAL_START_EVENT_ID = 24;

export const JOBHUNTING_EVENT_ID: number = 7;

export const IN_PHASE_END_EVENT_ID: number = 307;
export const PHASE_END_EVENT_ID: number = 308;

export const UNEXECUTABLE_EVENT_IDS = [307, 308];

export const GAME_OVER_EVENTS_MAP: Map<PlayerStatus, number> = new Map<PlayerStatus, number>([
    [PlayerStatus.HAPPY_ENDING, 200],
    [PlayerStatus.DIED, 501],
    [PlayerStatus.DROPPED, 502],
    [PlayerStatus.NO_OFFER, 503],
    [PlayerStatus.DIDNT_START, 500],
    [PlayerStatus.FINAL_ABSENT, 504],
]);