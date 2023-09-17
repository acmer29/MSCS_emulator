export const enum PlayerStatus {
    ALIVE, // Still playing.
    // Below are default gameover status.
    HAPPY_ENDING, // Get the offer.
    DROPPED, // Two C or below.
    DIED, // Health <= 0.
    NO_OFFER, // Alive in R48 but no offer.
    // Below are gameover triggered by events, will not be maintained by Player.
    DIDNT_START, // Event 500.
    FINAL_ABSENT, // Event 504.
}

export const MAX_HEALTH: number = 100;
export const MAX_STUDY: number = 100;
export const MAX_CODING: number = 128;
export const MAX_WORKING: number = 100;
export const MAX_INTERVIEW_PROBABILITY: number = 50;

export const INITIAL_HEALTH_VALUE: number = 80;
export const INITIAL_HEALTH_VALUE_LOW: number = 70;

export const INITIAL_STUDY_VALUE: number = 70;
export const INITIAL_STUDY_VALUE_HIGH: number = 80;
export const INITIAL_STUDY_VALUE_LOW: number = 60;

export const INITIAL_CODING_VALUE: number = 10;
export const INITIAL_CODING_VALUE_HIGH: number = 30;

export const INITIAL_INTERVIEW_PROBABILITY: number = 20;
export const INITIAL_INTERVIEW_PROBABILITY_HIGH: number = 25;
export const INITIAL_INTERVIEW_PROBABILITY_LOW: number = 10;