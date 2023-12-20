import { PlayerStatus } from "../Player/PlayerConstants";
import { Parameter } from "../Player/Parameter";
import { RoundManager, RoundPhases } from "./RoundManager";

// Set this flag to true to enable existing console loggings,
// Please do not use console loggings, use DebugLogger(message: any)
// instead.
export var DEBUG_FLAG: boolean = false;

export class GameManager {
    private _roundManager: RoundManager;

    constructor() {
        this._roundManager = new RoundManager();
    }
    
    async gameRun(): Promise<void> {
        // To start a debug under a specific condition, you can create a player
        // with desired parameters and attributes, and start in a chosen event.
        // Like this:
        // this._roundManager.reset(new Player(), /* eventId= */ 0);
        while (true) {
            // The round can be started in a specified phase for debugging purposes.
            await this._roundManager.oneRound();
        }
    }
}