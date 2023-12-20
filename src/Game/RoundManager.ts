import { EventManager } from "../Event/EventManager";
import { UiManager } from "../Ui/UiManager";
import { Player } from "../Player/Player";
import { PlayerStatus } from "../Player/PlayerConstants";
import { COMPULSORY_EVENT_ROUNDS, GAME_START_ROUND, SUMMER_I_ROUNDS } from "./RoundConstants";
import { COMPULSORY_EVENT_IDS, FINAL_TEST_START_EVENT_ID, GAME_OVER_EVENTS_MAP, GAME_START_EVENT_ID, IN_PHASE_END_EVENT_ID, JOBHUNTING_EVENT_ID, NORMAL_EVENT_ID, PHASE_END_EVENT_ID, RETURN_OFFER_EVAL_START_EVENT_ID } from "../Event/EventConstants";
import { getRandomInt } from "../Utils/Rng";
import { DebugLogger } from "../Utils/UtilFns";

export enum RoundPhases {
    INVALID,
    GAME_START_PHASE,
    RESULT_EVENT_PHASE,
    NORMAL_EVENT_PHASE,
    COMPULSORY_EVENT_PHASE,
    JOBHUNTING_EVENT_PHASE,
    RANDOM_EVENT_PHASE,
}

export class RoundManager {
    private _currentPhase: RoundPhases = RoundPhases.INVALID;
    private _currentEventId: number = 0;
    private _suspendedCurrentEventId: number = -1;
    private _randomEventNum: number = 0;

    private _player: Player;

    private _ui: UiManager;
    private _eventManager: EventManager;

    constructor() {
        this._ui = new UiManager();
        this._eventManager = new EventManager();
        this._player = new Player();
        this.reset();
    }
    
    reset(player: Player | null = null, eventId: number = GAME_START_EVENT_ID) {
        this._currentEventId = eventId;
        this._suspendedCurrentEventId = -1;
        if (player != null) {
            this._player = player;
        } else {
            this._player.reset();
        }
        this._ui.reset();
    }

    async oneRound(initialPhase: RoundPhases | null = null): Promise<void> {
        this._ui.printTime(this._player.round);

        this._eventManager.resetUsedRandomEvent();
        this._randomEventNum = getRandomInt(4);

        this._currentPhase = initialPhase == null ? this.setupInitialPhase() : initialPhase;

        DebugLogger("Round " + this._player.round + ", phase " + this._currentPhase + " event id:" + this._currentEventId);
        
        while(this._currentPhase != RoundPhases.INVALID && 
            this._player.status == PlayerStatus.ALIVE) {            
            switch (this._currentPhase) {
            case RoundPhases.COMPULSORY_EVENT_PHASE:
                await this.phaseCompulsoryEvent();
                break;
            case RoundPhases.RANDOM_EVENT_PHASE:
                await this.phaseRandomEvent();
                break;
            case RoundPhases.RESULT_EVENT_PHASE:
                await this.phaseResultEvent();
                break;
            case RoundPhases.NORMAL_EVENT_PHASE:
                await this.phaseNormalEvent();
                break;
            case RoundPhases.GAME_START_PHASE:
                await this.phaseGameStartEvent();
                break;
            case RoundPhases.JOBHUNTING_EVENT_PHASE:
                await this.phaseJobhuntingEvent();
            default:
                break;
            }
        }
        DebugLogger("Exit phase transition loop.");
        // Gameover, reset the game.
        if (this._player.status != PlayerStatus.ALIVE || 
            Array.from(GAME_OVER_EVENTS_MAP.values()).includes(this._currentEventId)) {
            await this.phaseGameEndEvent();
            this.reset();
            DebugLogger("Restart the game");
        } else {
            this._player.round += 1;
        }
        DebugLogger("exit one round");
    }

    private setupInitialPhase(): RoundPhases {
        // P1: If game start, transit to game start phase.
        if (this._player.round == GAME_START_ROUND) {
            return RoundPhases.GAME_START_PHASE;
        }
        
        // P2: If any result event for this round exist, transit to result event phase.
        if (this._player.roundResultEventQueue.length != 0 && 
            this._player.roundResultEventQueue[0][0] <= this._player.round) {
            // Suspend the current event, altered with IN_PHASE_END_EVENT_ID.
            this._suspendedCurrentEventId = this._currentEventId;
            this._currentEventId = IN_PHASE_END_EVENT_ID
            return RoundPhases.RESULT_EVENT_PHASE;
        }
        
        // P3: If the round is compulsory round, transit to compulsory event phase.
        if (COMPULSORY_EVENT_ROUNDS.includes(this._player.round)) {
            return RoundPhases.COMPULSORY_EVENT_PHASE;
        }

        // P4: If has internship and it is last round of summer 1, transit to compulsory event phase.
        if (SUMMER_I_ROUNDS[SUMMER_I_ROUNDS.length - 1] == this._player.round && this._player.attributeIds.includes(11)) {
            return RoundPhases.COMPULSORY_EVENT_PHASE;
        }

        // Print SU theme now and only once if property contains SU.
        if (this._player.attributeIds.includes(5)) {
            this._ui.printSuTheme();
        }

        // Default: Normal event phase.
        this._currentEventId = NORMAL_EVENT_ID;
        return RoundPhases.NORMAL_EVENT_PHASE;
    }

    private async phaseResultEvent(): Promise<void> {
        DebugLogger("phase result, round " + this._player.round);
        
        let nextPhase: RoundPhases = RoundPhases.NORMAL_EVENT_PHASE;
        if (COMPULSORY_EVENT_ROUNDS.includes(this._player.round)) {
            nextPhase = RoundPhases.COMPULSORY_EVENT_PHASE;
        }
        if (SUMMER_I_ROUNDS[SUMMER_I_ROUNDS.length - 1] == this._player.round && this._player.attributeIds.includes(11)) {
            nextPhase = RoundPhases.COMPULSORY_EVENT_PHASE;
        }

        let context: any = null;
        if (this._currentEventId == IN_PHASE_END_EVENT_ID) {
            if (this._player.roundResultEventQueue.length > 0 && 
                this._player.roundResultEventQueue[0][0] <= this._player.round) {
                let eventInfo: [number, number, number] = this._player.roundResultEventQueue.shift()!;
                DebugLogger("Round " + this._player.round + "event info are " + eventInfo);
                this._currentEventId = eventInfo[1];
                context = eventInfo[2] == -1 ? null : eventInfo[2];
            } else {
                this._currentEventId = PHASE_END_EVENT_ID;
                this.phaseTransition(nextPhase, this._suspendedCurrentEventId);
                return;
            }
        }

        await this.eventTransition(context);
        this.phaseTransition(nextPhase, this._suspendedCurrentEventId);
    }

    private async phaseCompulsoryEvent(): Promise<void> {
        DebugLogger("phase compulsory, round " + this._player.round);
        // As compulsory name suggests, force the current event to be the compulsory event.
        if (!COMPULSORY_EVENT_IDS.includes(this._currentEventId)) {
            if (COMPULSORY_EVENT_ROUNDS.includes(this._player.round)) {
                this._currentEventId = FINAL_TEST_START_EVENT_ID;
            } else {
                this._currentEventId = RETURN_OFFER_EVAL_START_EVENT_ID
            }
        }
        await this.eventTransition();
        this.phaseTransition(RoundPhases.INVALID, NORMAL_EVENT_ID);
    }

    private async phaseJobhuntingEvent(): Promise<void> {
        DebugLogger("phase job hunting, round " + this._player.round);
        if (this._currentEventId == IN_PHASE_END_EVENT_ID) {
            let tmp = getRandomInt(100);
            DebugLogger(tmp + " and " + this._player.parameter.interviewProbability);
            let hasInterview: boolean = tmp < this._player.parameter.interviewProbability;
            this._currentEventId = hasInterview ? JOBHUNTING_EVENT_ID : PHASE_END_EVENT_ID;
        }
        if (this._currentEventId != PHASE_END_EVENT_ID) {
            await this.eventTransition();
        }
        this.phaseTransition(RoundPhases.RANDOM_EVENT_PHASE, IN_PHASE_END_EVENT_ID);
    }

    private async phaseRandomEvent(): Promise<void> {
        DebugLogger("phase random1, round" + this._player.round);
        if (this._randomEventNum > 0 && this._currentEventId == IN_PHASE_END_EVENT_ID) {
            let possibleNextRandomEventId = this._eventManager.getNextRandomEvent(this._player);
            this._currentEventId = possibleNextRandomEventId == -1 ? PHASE_END_EVENT_ID : possibleNextRandomEventId;
            this._randomEventNum -= 1;
        } else if (this._randomEventNum <= 0 && this._currentEventId == IN_PHASE_END_EVENT_ID) {
            this._currentEventId = PHASE_END_EVENT_ID;
        }

        if (this._currentEventId != PHASE_END_EVENT_ID) {
            await this.eventTransition();
        }
        this.phaseTransition(RoundPhases.INVALID, NORMAL_EVENT_ID);
    }

    private async phaseNormalEvent(): Promise<void> {
        DebugLogger("phase normal, round" + this._player.round);
        await this.eventTransition()
        this.phaseTransition(RoundPhases.JOBHUNTING_EVENT_PHASE, IN_PHASE_END_EVENT_ID);
    }

    private async phaseGameStartEvent(): Promise<void> {
        DebugLogger("phase game start, round" + this._player.round);
        await this.eventTransition();
        this.phaseTransition(RoundPhases.INVALID, NORMAL_EVENT_ID);
    }

    private async phaseGameEndEvent(): Promise<void> {
        DebugLogger("phase game end, round" + this._player.round);
        await this.eventTransition();
    }

    private async eventTransition(context: any = null): Promise<void> {
        let executionResult: [string[], Map<number, string[]>] = 
            this._eventManager.executeEvent(this._currentEventId, this._player, context);

        // Do not print the initialized value before event 102 changes them.
        if (![100, 500].includes(this._currentEventId)) {
            this._ui.printParameter(this._player.parameter);
            this._ui.printAttributes(this._player.attributeStrings);
        }
        // Print attribute descriptions after attributes are assigned.
        if (this._player.attributeIds.length) {
            this._ui.printAttributeModal(this._player.attributeIds);
        }
        
        let choice: number = await this._ui.printAndSetupEvent(
            executionResult[0], executionResult[1]);
        this._currentEventId = choice;
    }

    private phaseTransition(expectedNext: RoundPhases, phaseTransitionEvent: number) {
        DebugLogger("phase transition: " + this._currentPhase + " to " + expectedNext + ", displaying event id: " + this._currentEventId);
        if (this._player.status != PlayerStatus.ALIVE) {
            // General transition to GAME_END_PHASE.
            DebugLogger("case 1");
            this._currentEventId = GAME_OVER_EVENTS_MAP.get(this._player.status)!;
            this._currentPhase = RoundPhases.INVALID;
        } else if (Array.from(GAME_OVER_EVENTS_MAP.values()).includes(this._currentEventId)) {
            // Already triggered game over event, end round with game over immidiately.
            DebugLogger("case 1.1");
            this._currentPhase = RoundPhases.INVALID;
        } else if (this._currentEventId == PHASE_END_EVENT_ID) {
            // Normal phase transition.
            DebugLogger("case 2");
            this._currentEventId = phaseTransitionEvent;
            this._currentPhase = expectedNext;
        } else {
            // Still in current phase.
            DebugLogger("case 3");
        }
    }
}