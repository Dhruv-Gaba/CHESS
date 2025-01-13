import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button";

export const Landing=()=>{
    const navigate = useNavigate();
    return (
        <div className="flex justify-center flex items-center h-screen">
            <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-1">
                <div className="flex justify-center">
                    <img src="/chessBoard.jpg" className="h-96 w-5/6"/>
                </div>
                <div className="pt-16">
                    <div className="flex justify-center">
                        <h1 className="text-4xl font-bold text-white">Play chess online on #2 Site!</h1>
                    </div>
                    <div className="flex justify-center mt-10">
                        {/* <button onClick={()=>navigate("/game")} className="text-2xl bg-green-500 hover:bg-green-700 px-8 py-4 rounded text-white font-bold">
                            Play Online
                        </button> */}
                        <Button onClick={()=>navigate("/game")}>
                            Play Online
                        </Button>
                    </div>
                </div>
            </div>
            <div></div>
            
        </div>
    )
}