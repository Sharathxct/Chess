import { useState } from 'react'
import { Routes, Route } from'react-router-dom'
import Home from './pages/Home.jsx'
import Game from './pages/Game.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/game' element={<Game/>} />
    </Routes>
  )
}

export default App
