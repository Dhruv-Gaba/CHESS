import { Chess, Color, Move, PieceSymbol, Square } from "chess.js"
import { useState } from "react"
import { MOVE } from "../screens/Game";

export function isPromoting(chess:Chess,from:Square,to:Square) {
    const piece = chess.get(from);
  
    if (piece?.type !== "p") {
      return false;
    }
  
    if (piece.color !== chess.turn()) {
      return false;
    }
  
    if (!["1", "8"].some((it) => to.endsWith(it))) {
      return false;
    }
  
    return chess
      .moves({ square:from, verbose: true })
      .map((it) => it.to)
      .includes(to);
  }

export const ChessBoard=({setMoves,color,board,socket,chess,setBoard}:{
    setMoves:React.Dispatch<React.SetStateAction<Move[]>>,
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
                                    setFrom(null);
                                    if(isPromoting(chess,from as Square,squareRep as Square)){
                                        const piece=prompt("what you want to promote to? q=>queen; r=>rook; b=>bishop; n=>knight;");
                                        socket.send(JSON.stringify({
                                            type:MOVE,
                                            payload:{
                                                move:{
                                                    from,
                                                    to:squareRep,
                                                    promotion:piece
                                                }
                                            }
                                        }))
                                        chess.move({
                                            from,
                                            to:squareRep,
                                            promotion:piece
                                        });
                                    }
                                    else{
                                        socket.send(JSON.stringify({
                                            type:MOVE,
                                            payload:{
                                                move:{
                                                    from,
                                                    to:squareRep
                                                }
                                            }
                                        }))
                                        chess.move({
                                            from,
                                            to:squareRep,
                                        });
                                    }
                                    setBoard(chess.board());
                                    setMoves(chess.history({ verbose: true }));


                                    console.log(
                                        {
                                            from,
                                            to:squareRep
                                        }
                                    )
                                }
                            }} key={j} className={`w-16 h-16 lg:w-20 lg:h-20 ${from && from===squareRep?"bg-red-400":((i+j)%2==0?'bg-white':'bg-green-500')} cursor-pointer`}>
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