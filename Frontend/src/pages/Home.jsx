import React from 'react'
import { Link, Navigate } from 'react-router-dom'





export default function Home() {

    function handleOnClick() {
        Navigate('/game')
    }

  return (
    <div className='bg-teal-300 w-[100%] h-[100vh] flex justify-center items-center'>
        <div className='grid grid-cols-1 md:grid-cols-2 w-1/2 gap-5'>
            <div className='md:col-start-1 md:col-end-2'>
                <img src="image.png" className='w-96' alt="Chess board" />
            </div>
            <div className='md:col-start-2 md:col-end-3 h-full flex flex-col justify-center items-center'>
                <h1 className='text-lg text-center md:text-4xl font-bold' >Play Chess Online</h1>
                <Link to='/game' className='text-black border-1 bg-blue-600 px-10 py-3 mt-3 rounded-lg font-bold  text-sm md:text-lg  hover:bg-blue-800'>Play</Link>
            </div>
        </div>
    </div>
  )
}
