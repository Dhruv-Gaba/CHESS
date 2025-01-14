import { Color, PieceSymbol, Square } from "chess.js"
import { useState } from "react"
import { MOVE } from "../screens/Game";

export const ChessBoard=({color,board,socket,chess,setBoard}:{
    color:string,
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
        <div className={`text-white-200 ${color==="black"?"rotate-180":""}`}>
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
                                    console.log(socket);
                                }
                            }} key={j} className={`w-16 h-16 lg:w-20 lg:h-20 ${(i+j)%2==0?'bg-white':'bg-green-500'} cursor-pointer`}>
                                <div className="flex justify-center items-center h-full font-bold">
                                    {square?<img src={`/${square.color==="b"?square.type:square.type.toUpperCase()+" copy"}.png`} className={color==="black"?"rotate-180":""}/>:""}
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