import { useEffect, useState } from "react";
import { Button } from "../components/Button"
import { ChessBoard } from "../components/ChessBoard"
import { useSocket } from "../hooks/useSocket"
import { Chess } from "chess.js";

//code repetition
export const INIT_GAME="init_game";
export const MOVE="move";
export const GAME_OVER="game_over";

export const Game=()=>{
    const socket=useSocket();
    const [chess,setChess]=useState(new Chess());
    const [board,setBoard]=useState(chess.board());
    const [started,setStarted]=useState(false);
    const [text,setText]=useState("");
    const [gameOver,setGameOver]=useState(false);
    const [winner,setWinner]=useState("");
    const [color,setColor]=useState("");

    useEffect(()=>{
        if(!socket){
            return;
        }
        socket.onmessage=(event)=>{
            const message=JSON.parse(event.data);
            console.log(message);
            switch(message.type){
                case INIT_GAME:
                    setStarted(true);
                    setText("");
                    setBoard(chess.board());
                    setColor(message.payload.color);
                    console.log("game initialized");
                    break;
                case MOVE:
                    const move=message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    console.log("move made");
                    break;
                case GAME_OVER:
                    setWinner(message.payload.winner);
                    console.log("game over");
                    setGameOver(true);
                    break;
            }
        }
    },[socket])

    if(!socket){
        return <div>Connecting...</div>
    }
    
    return(
        <div className="flex justify-center">
            <div className="pt-8 max-w-screen-lg w-full">
                <div className="grid grid-cols-6 gap-4 w-full">
                    <div className="col-span-4 w-full flex justify-center">
                        <ChessBoard color={color} chess={chess} setBoard={setBoard} board={board} socket={socket}/>
                    </div>
                    <div className="bg-slate-900 col-span-2 w-full flex justify-center">
                        <div className="pt-8">
                            <div className="text-white">
                                {text && text}
                            </div>
                            <div>
                                {
                                    gameOver && 
                                        <div className="text-white">
                                            <div className="text-3xl font-bold">Game Over!<br/><u>{winner}</u> won!!</div>
                                        </div>
                                }
                                {!started && !text && !gameOver &&
                                    <Button onClick={()=>{
                                        setText("waiting for other player...")
                                        socket.send(JSON.stringify({
                                            type:INIT_GAME,
                                        }))
                                    }}>
                                        Play
                                    </Button>
                                }
                                {
                                    started && !gameOver && <h1 className="text-white text-4xl font-bold">Game Started</h1>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}