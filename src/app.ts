import { GameManager } from "./Game/GameManager";

class App {
    private _gameManager: GameManager;

    constructor() {
        this._gameManager = new GameManager();
    }

    async start(): Promise<void> {
        this._gameManager.gameRun();
    }
}

const app = new App();
app.start();