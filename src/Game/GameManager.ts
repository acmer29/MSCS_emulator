import { PlayerStatus } from "../Player/PlayerConstants";
import { Parameter } from "../Player/Parameter";
import { Player } from "../Player/Player";
import { RoundManager } from "./RoundManager";

export class GameManager {
    private _roundManager: RoundManager;

    constructor() {
        this._roundManager = new RoundManager();
    }
    
    async gameRun(): Promise<void> {
        while (true) {
            await this._roundManager.oneRound();
        }
    }
}