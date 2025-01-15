import { useEffect, useState } from "react";
import { Button } from "../components/Button"
import { ChessBoard } from "../components/ChessBoard"
import { useSocket } from "../hooks/useSocket"
import { Chess, Move } from "chess.js";
import { MovesTable } from "../components/MovesTable";

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
    const [moves,setMoves]=useState<Move[]>(chess.history({ verbose: true }));

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
                    console.log(moves)
                    break;
                case MOVE:
                    const move=message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    setMoves(chess.history({ verbose: true }));
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
                        <ChessBoard setMoves={setMoves} color={color} chess={chess} setBoard={setBoard} board={board} socket={socket}/>
                    </div>
                    <div className="bg-slate-900 col-span-2 w-full flex justify-center h-[32rem] lg:h-[40rem] overflow-auto overflow-x-hidden">
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
                                    started && !gameOver && <div className="text-white">
                                        <h1 className="text-4xl font-bold pb-3">Game Started</h1>
                                        <hr/>
                                        <h3 className="py-4">Moves Table :</h3>
                                        <MovesTable moves={moves}/>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}