import { useEffect, useState } from "react";

export const  useSocket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080/");

        ws.onopen = () => {
            console.log("Socket connected");
            setSocket(ws);
        };

        ws.onclose = () => {
            console.log("Socket closed");
            setSocket(null);
        };

        

    }, [])
    return socket;
}