import { Color, PieceSymbol, Square } from "chess.js"
import { useState } from "react"
import { MOVE } from "../screens/Game";

export const ChessBoard=({board,socket,chess,setBoard}:{
    chess:any,
    setBoard:any,
    board:({
        square:Square,
        type:PieceSymbol,
        color:Color,
    } | null)[][],
    socket:WebSocket
})=>{
    const [from,setFrom]=useState<string|null>(null);
    // const [to,setTo]=useState<string|null>(null);

    return(
        <div className="text-white-200">
            {board.map((row, i) => {
                return(
                <div key={i} className="flex">
                    {row.map((square, j) => {
                        const squareRep=String.fromCharCode(97+j)+""+(8-i);
                        return(
                            <div onClick={()=>{
                                if(!from){
                                    setFrom(squareRep);
                                }else{
                                    socket.send(JSON.stringify({
                                        type:MOVE,
                                        payload:{
                                            move:{
                                                from,
                                                to:squareRep
                                            }
                                            
                                        }
                                    }))
                                    setFrom(null);
                                    chess.move({
                                        from,
                                        to:squareRep
                                    });
                                    setBoard(chess.board());

                                    console.log(
                                        {
                                            from,
                                            to:squareRep
                                        }
                                    )
                                }
                            }} key={j} className={`w-16 h-16 lg:w-20 lg:h-20 ${(i+j)%2==0?'bg-green-500':'bg-white'}`}>
                                <div className="flex justify-center items-center h-full font-bold">
                                    {square?square.type:""}
                                </div>
                            </div>
                        )
                    })}
                </div>
                )
            }
        )}
        </div>
    )
}