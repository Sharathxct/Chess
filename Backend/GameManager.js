import { INIT_GAME ,MOVE } from "./Messages.js";
import { Game } from "./Game.js";

class GameManager {
    
    games =[];
    players = [];
    pendingUser = null;

    constructor() {
    }

    addUser(ws) {
        this.players.push(ws);
        this.handleMessage(ws);
    }

    removeUser(ws) {
        this.players.filter(player => player!== ws);
        //TODO: Stop the game here
    }

    handleMessage(ws, message) {
        // TODO: Implement this.
        ws.on('message', (message) => {
            const data = JSON.parse(message);
            // console.log(data);
            switch (data.type) {
                case INIT_GAME:
                    if(this.pendingUser) {
                        this.games.push(new Game(this.pendingUser, ws));
                        console.log("Game created");
                        this.pendingUser = null;
                    } else {
                        this.pendingUser = ws;
                    }
                    break;

                case MOVE:
                    // console.log(data);
                    const game = this.games.find(game => game.player1 === ws || game.player2 === ws);
                    if(game) {
                        game.makeMove(ws , data.move);
                    }
                default:
                    break;
            }
        });
    }

}

export { GameManager };