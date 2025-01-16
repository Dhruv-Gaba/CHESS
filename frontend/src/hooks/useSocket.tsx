import { useEffect, useState } from "react";

// const WS_URL="ws://localhost:8080";
const WS_URL = "wss://chess-multiplayer-jlcs.onrender.com";

export const useSocket=()=>{
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(()=>{
        const ws=new WebSocket(WS_URL);
        ws.onopen=()=>{
            setSocket(ws);
        }
        ws.onclose=()=>{
            setSocket(null);
        }
        return ()=>{
            ws.close();
        }
    },[])

    return socket;

}