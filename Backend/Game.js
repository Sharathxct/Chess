import { Chess } from "chess.js";
import { INIT_GAME, GAME_OVER ,MOVE } from "./Messages.js";

class Game{

    player1;
    player2;
    board = new Chess();
    moves = [];
    moveCount = 0;
    startTime;

    constructor(player1, player2){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type : INIT_GAME,
            payload : {
                color : "WHITE",
            }
        }));
        this.player2.send(JSON.stringify({
            type : INIT_GAME,
            payload : {
                color : "BLACK",
            }
        }));
    }

    makeMove(ws, move){
        //Validation
        //is it this user's move?
        // console.log("from make move", ws , move);
        if(this.moveCount % 2 === 0 && this.player1!== ws){
            // console.log("early return 1");
            return;
        }
        if(this.moveCount % 2 === 1 && this.player2!== ws){
            // console.log("early return 2");
            return;
        }
        //is it a valid move?
        try{
            // console.log("Control reached here before board", this.board );
            this.board.move(move);
            this.moves.push(move);
            // console.log("Control reached here after board", this.board );
        } catch(e){
            console.log("erraneus return", e);
            return;
        }

        //Update the board
        //Push the move

        //Check if game is over
        if(this.board.isGameOver()){
            // send the board to both players
            this.player1.send(JSON.stringify({
                type : GAME_OVER,
                payload : {
                    winner : this.board.turn() === 'w' ? "Black" : "White"
                }
            }))
        }
        // send the board to both players

        if(this.moveCount % 2 === 0){
            this.player2.send(JSON.stringify({
                type : MOVE,
                payload : {
                    move : move,
                }
            }))
        }
        else{
            this.player1.send(JSON.stringify({
                type : MOVE,
                payload : {
                    move : move,
                }
            }))
        }
        this.moveCount++;
    }
}

export {
    Game
};