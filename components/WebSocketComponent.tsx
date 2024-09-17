'use client';
import React, { useState, useEffect } from 'react';
// sprintf(msg, "{\"red\":%d, \"ir\":%d, \"green\":%d}", particleSensor.getRed(), particleSensor.getIR(), particleSensor.getGreen());


const WebSocketComponent: React.FC = () => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [red, setRed] = useState<number>(0);
    const [ir, setIR] = useState<number>(0);
    const [green, setGreen] = useState<number>(0);

    useEffect(() => {
        const websocket = new WebSocket('ws://192.168.0.180/ws');

        websocket.onopen = () => {
            // addLog('Connected to WebSocket server');
            console.log('Connected to WebSocket server');
        };

        websocket.onmessage = (event: MessageEvent) => {
            // addLog(`Received: ${event.data}`);
            const data = JSON.parse(event.data);
            if (data.type === 'rig') {
                console.log(data)
                setRed(data.data.red);
                setIR(data.data.ir);
                setGreen(data.data.green);
            }
        };

        websocket.onerror = (event: Event) => {
            // addLog(`Error: ${event}`);
            console.log(event);
        };

        websocket.onclose = () => {
            // addLog('WebSocket connection closed');
            console.log('WebSocket connection closed');
        };

        setWs(websocket);

        return () => {
            websocket.close();
        };
    }, []);


    // const sendMessage = () => {
    //     if (ws && message) {
    //         ws.send(message);
    //         setMessage('');
    //     }
    // };

    return (
        <div>
            <h1>WebSocket</h1>

            <div>
                <p>Red: {red}</p>
                <p>IR: {ir}</p>
                <p>Green: {green}</p>
            </div>
        </div>
    );
};

export default WebSocketComponent;
