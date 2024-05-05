import { WebSocketServer } from 'ws';
import {GameManager}  from './GameManager.js';

const wss = new WebSocketServer({ port: 8080 });

const gameManager = new GameManager();

wss.on('connection', (ws) => {
    console.log('Client connected');
    gameManager.addUser(ws);
    ws.on('disconnect', () => {
        console.log('Client disconnected');
        gameManager.removeUser(ws);
    });
});