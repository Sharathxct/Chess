import  { useState,  useEffect } from 'react'
import Chessboard from '../components/Chessboard'
import { useSocket } from '../hooks/useSocket'
import {Chess} from 'chess.js'

export default function Game() {

  const socket = useSocket()
  const [chess, setChess] = useState(new Chess())
  const [board, setBoard] = useState(chess.board())

  useEffect(()=>{
    if(!socket){
        return
    }
    socket.onmessage =(event) =>{
        const message = JSON.parse(event.data)
        console.log(message)
        switch(message.type){
            case 'INIT_GAME':
                setChess(new Chess());
                setBoard(chess.board());
                break
            case 'MOVE':
                const move = message.payload.move
                chess.move(move)
                setBoard(chess.board())
                break
            case 'GAME_OVER':
                console.log('game move')
                break
            default:
                console.log('unknown message')
                break
        }
    }
  },[socket])

  if(!socket){
        console.log('no socket', socket)
      return <div>Connecting to server... </div>
  }
  

  return (
    <div className='bg-teal-300  h-[100vh] flex justify-center items-center'>
        <div className='grid grid-cols-1 md:grid-cols-6   gap-5'>
            <div className='md:col-span-4 w-full h-full flex items-center justify-center ' >
               <Chessboard socket = {socket} setBoard={setBoard} chess={chess} board={board} />
            </div>
            <div className='md:col-span-2 h-full flex flex-col justify-start items-center'>
                <h1 className='text-xl font-bold m-3'>Click here to start the game</h1>
                <button className='bg-blue-500 rounded-lg px-10 py-3 font-semibold' 
                onClick={ () => socket.send(JSON.stringify({
                    type: 'INIT_GAME'
                })) }> Start  </button>
            </div>

        </div>
    </div>
  )
}
