import { EventManager } from "../Event/EventManager";
import { UiManager } from "../Ui/UiManager";
import { Player } from "../Player/Player";
import { PlayerStatus } from "../Constant/PlayerConstants";
import { COMPULSORY_EVENT_ROUNDS, GAME_START_ROUND, SUMMER_I_ROUNDS } from "../Constant/RoundConstants";
import { COMPULSORY_EVENT_IDS, FINAL_TEST_START_EVENT_ID, GAME_OVER_EVENTS_MAP, GAME_START_EVENT_ID, IN_PHASE_END_EVENT_ID, JOBHUNTING_EVENT_ID, NORMAL_EVENT_ID, PHASE_END_EVENT_ID, RETURN_OFFER_EVAL_START_EVENT_ID } from "../Constant/EventContants";
import { Parameter } from "../Player/Parameter";
import { getRandomInt } from "../Utils/Rng";
import { ExecutableEventDecorator } from "../Event/ExecutableEventDecorator";

enum RoundPhases {
    INVALID,
    GAME_START_PHASE,
    RESULT_EVENT_PHASE,
    NORMAL_EVENT_PHASE,
    COMPULSORY_EVENT_PHASE,
    JOBHUNTING_EVENT_PHASE,
    RANDOM_EVENT_1_PHASE,
    // RANDOM_EVENT_2_PHASE,
}

export class RoundManager {
    private _currentPhase: RoundPhases = RoundPhases.INVALID;
    private _currentEventId: number = 0;
    private _suspendedCurrentEventId: number = -1;

    private _player: Player | null = null;

    private _ui: UiManager;
    private _eventManager: EventManager;
    private _render: ExecutableEventDecorator;

    constructor() {
        this._ui = new UiManager();
        this._eventManager = new EventManager();
        this._render = new ExecutableEventDecorator();
        this._player = new Player();
        this.reset();
    }
    
    reset(player: Player | null = null, eventId: number = GAME_START_EVENT_ID) {
        this._currentEventId = eventId;
        this._suspendedCurrentEventId = -1;
        if (player != null) {
            this._player = player;
        } else {
            this._player!.maintainAttribute(/* reset= */true);
            this._player!.parameter = new Parameter();
            this._player!.round = -1;
            this._player!.status = PlayerStatus.ALIVE;
            this._player!.status = 0;
            this._player!.roundResultEventQueue = [];
        }
    }

    async oneRound(initialPhase: RoundPhases | null = null): Promise<void> {
        this._currentPhase = initialPhase == null ? this.setupInitialPhase() : initialPhase;

        console.log("Round " + this._player!.round + ", phase " + this._currentPhase + " event id:" + this._currentEventId);
        while(this._currentPhase != RoundPhases.INVALID && 
            this._player!.status == PlayerStatus.ALIVE) {            
            switch (this._currentPhase) {
            case RoundPhases.COMPULSORY_EVENT_PHASE:
                await this.phaseCompulsoryEvent();
                break;
            case RoundPhases.RANDOM_EVENT_1_PHASE:
                await this.phaseRandomEvent1();
                break;
            // case RoundPhases.RANDOM_EVENT_2_PHASE:
            //     await this.phaseRandomEvent2();
            //     break;
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
        console.log("Exit phase transition loop.");
        if (this._player!.status != PlayerStatus.ALIVE || 
            Array.from(GAME_OVER_EVENTS_MAP.values()).includes(this._currentEventId)) {
            await this.phaseGameEndEvent();
            this.reset();
            console.log("Restart the game");
        } else {
            this._player!.round += 1;
        }
        console.log("exit one round");
    }

    private setupInitialPhase(): RoundPhases {
        // P1: If game start, transit to game start phase.
        if (this._player!.round == GAME_START_ROUND) {
            return RoundPhases.GAME_START_PHASE;
        }
        
        // P2: If any result event for this round exist, transit to result event phase.
        if (this._player!.roundResultEventQueue.length != 0 && 
            this._player!.roundResultEventQueue[0][0] <= this._player!.round) {
            // Suspend the current event, altered with first result event.
            this._suspendedCurrentEventId = this._currentEventId;
            this._currentEventId = this._player!.roundResultEventQueue.shift()![1];
            return RoundPhases.RESULT_EVENT_PHASE;
        }
        
        // P3: If the round is compulsory round, transit to compulsory event phase.
        if (COMPULSORY_EVENT_ROUNDS.includes(this._player!.round)) {
            return RoundPhases.COMPULSORY_EVENT_PHASE;
        }

        // P4: If has internship and it is last round of summer 1, transit to compulsory event phase.
        if (SUMMER_I_ROUNDS[SUMMER_I_ROUNDS.length - 1] == this._player!.round && this._player!.attributeIds.includes(11)) {
            return RoundPhases.COMPULSORY_EVENT_PHASE;
        }

        // Default: Normal event phase.
        this._currentEventId = NORMAL_EVENT_ID;
        return RoundPhases.NORMAL_EVENT_PHASE;
    }

    private async phaseResultEvent(): Promise<void> {
        console.log("phase result, round " + this._player!.round);
        
        let nextPhase: RoundPhases = RoundPhases.NORMAL_EVENT_PHASE;
        if (COMPULSORY_EVENT_ROUNDS.includes(this._player!.round)) {
            nextPhase = RoundPhases.COMPULSORY_EVENT_PHASE;
        }
        if (SUMMER_I_ROUNDS[SUMMER_I_ROUNDS.length - 1] == this._player!.round && this._player!.attributeIds.includes(11)) {
            nextPhase = RoundPhases.COMPULSORY_EVENT_PHASE;
        }

        if (this._currentEventId == IN_PHASE_END_EVENT_ID) {
            if (this._player!.roundResultEventQueue.length > 0 && 
                this._player!.roundResultEventQueue[0][0] <= this._player!.round) {
                this._currentEventId = this._player!.roundResultEventQueue.shift()![1];
            } else {
                this._currentEventId = PHASE_END_EVENT_ID;
                this.phaseTransition(nextPhase, this._suspendedCurrentEventId);
                return;
            }
        }

        await this.eventTransition();
        this.phaseTransition(nextPhase, this._suspendedCurrentEventId);
    }

    private async phaseCompulsoryEvent(): Promise<void> {
        console.log("phase compulsory, round " + this._player!.round);
        // As compulsory name suggests, force the current event to be the compulsory event.
        if (!COMPULSORY_EVENT_IDS.includes(this._currentEventId)) {
            if (COMPULSORY_EVENT_ROUNDS.includes(this._player!.round)) {
                this._currentEventId = FINAL_TEST_START_EVENT_ID;
            } else {
                this._currentEventId = RETURN_OFFER_EVAL_START_EVENT_ID
            }
        }
        await this.eventTransition();
        this.phaseTransition(RoundPhases.INVALID, NORMAL_EVENT_ID);
    }

    private async phaseJobhuntingEvent(): Promise<void> {
        console.log("phase job hunting, round " + this._player!.round);
        console.log("Current event id " + this._currentEventId);
        if (this._currentEventId == IN_PHASE_END_EVENT_ID) {
            let tmp = getRandomInt(100);
            console.log(tmp + " and " + this._player!.parameter.interviewProbability);
            let hasInterview: boolean = tmp < this._player!.parameter.interviewProbability;
            this._currentEventId = hasInterview ? JOBHUNTING_EVENT_ID : PHASE_END_EVENT_ID;
        }
        if (this._currentEventId == PHASE_END_EVENT_ID) {
            this.phaseTransition(RoundPhases.RANDOM_EVENT_1_PHASE, NORMAL_EVENT_ID);
            return;
        }
        await this.eventTransition();
        this.phaseTransition(RoundPhases.RANDOM_EVENT_1_PHASE, IN_PHASE_END_EVENT_ID);
    }

    private async phaseRandomEvent1(): Promise<void> {
        console.log("phase random1, round" + this._player!.round);
        this._currentEventId = PHASE_END_EVENT_ID;
        this.phaseTransition(RoundPhases.INVALID, NORMAL_EVENT_ID);
    }

    private async phaseRandomEvent2(): Promise<void> {
    }

    private async phaseNormalEvent(): Promise<void> {
        console.log("phase normal, round" + this._player!.round);
        await this.eventTransition()
        this.phaseTransition(RoundPhases.JOBHUNTING_EVENT_PHASE, IN_PHASE_END_EVENT_ID);
    }

    private async phaseGameStartEvent(): Promise<void> {
        console.log("phase game start, round" + this._player!.round);
        await this.eventTransition();
        console.log("Event transition finished.");
        this.phaseTransition(RoundPhases.INVALID, NORMAL_EVENT_ID);
    }

    private async phaseGameEndEvent(): Promise<void> {
        console.log("phase game end, round" + this._player!.round);
        await this.eventTransition();
    }

    private async eventTransition(): Promise<void> {
        let executableEvent = await this._eventManager.serveExecutableEvent(this._currentEventId);
        let vars: Map<string, string> = await executableEvent.handler(this._player!);
        this._render.decorateEvent(executableEvent, this._player!, vars);
        this._ui.printFrame(this._player!);
        let choice: number = await this._ui.printAndSetupEvent(
            executableEvent.event.descriptions[0]!,
            executableEvent.event.options);
        this._currentEventId = choice;
    }

    private phaseTransition(expectedNext: RoundPhases, phaseTransitionEvent: number) {
        console.log("phase transition: " + this._currentPhase + " to " + expectedNext + ", displaying event id: " + this._currentEventId);
        if (this._player!.status != PlayerStatus.ALIVE) {
            // General transition to GAME_END_PHASE.
            console.log("case 1");
            this._currentEventId = GAME_OVER_EVENTS_MAP.get(this._player!.status)!;
            this._currentPhase = RoundPhases.INVALID;
        } else if (Array.from(GAME_OVER_EVENTS_MAP.values()).includes(this._currentEventId)) {
            // Already triggered game over event, end round with game over immidiately.
            console.log("case 1.1");
            this._currentPhase = RoundPhases.INVALID;
        } else if (this._currentEventId == PHASE_END_EVENT_ID) {
            // Normal phase transition.
            console.log("case 2");
            this._currentEventId = phaseTransitionEvent;
            this._currentPhase = expectedNext;
        } else {
            // Still in current phase.
            console.log("case 3");
        }
    }
}