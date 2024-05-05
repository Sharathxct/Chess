import {useEffect, useState} from 'react'

export default function Chessboard({ chess, setBoard,  socket, board}) {

    const [from , setFrom] = useState(null);
    const [to, setTo] = useState(null);

    useEffect(() => {
        if(from === null || to === null){
            return
        }
        socket.send(JSON.stringify({
            type: 'MOVE',
            move: {
                from,
                to
            }
        }))

        
        try{
            chess.move({
                from,
                to
            })
            setBoard(chess.board())
        }catch(e){
            console.log(e)
        }

        setFrom(null)
        setTo(null)
    }, [to])
    

    function handleOnSquareClick(i , j) {
        const square = String.fromCharCode(97 + j) + (8 - i)
        if(from === null){
            setFrom(square)
            console.log(from)
        }else{
            setTo(square)
            console.log(to)
        }
    }
  return (
    <div className='text-black w-full h-full flex flex-col justify-center items-center'>

        {
            board.map((row, i) => {
                return(
                <div key={i} className='flex justify-center'>
                    {
                        row.map((square, j) => {
                            
                            return (<div key={j} onClick={ () => handleOnSquareClick(i , j) }   className={ `w-8 h-8 sm:w-12 sm:h-12 flex justify-center items-center cursor-grab ${(i + j) % 2 === 0 ? 'bg-green-500': 'bg-green-300'} ${ ( ( from && from[0] == String.fromCharCode(97+j) && from[1] == (8-i)) || ( to && to[0] == String.fromCharCode(97+j) && to[1] == (8-i)) ) ? 'bg-slate-400' : ''   } `}>
                                {square ? square.type : ""}
                            </div>)
                        })      
                    }
                </div>)
                
            })
        }
    </div>
  )
}
