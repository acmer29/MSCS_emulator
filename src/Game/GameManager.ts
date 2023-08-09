import { PlayerStatus } from "../Constant/PlayerConstants";
import { Parameter } from "../Player/Parameter";
import { Player } from "../Player/Player";
import { RoundManager } from "./RoundManager";

export class GameManager {
    private _roundManager: RoundManager;

    constructor() {
        this._roundManager = new RoundManager();
    }
    
    async gameRun(): Promise<void> {
        // let player: Player = new Player(new Parameter(100, 100, 100, 100, 50, []), PlayerStatus.ALIVE, 46);
        // player.assignAttribute([12]);
        // this._roundManager.reset(player, 0);
        while (true) {
            await this._roundManager.oneRound();
        }
    }
}