import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Home } from './Components/Home/Home/Home'
import { Route, Routes } from 'react-router-dom'
import { Add } from './Components/Home/Home/Add/Add'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
 
    <Routes>
    <Route path='/' element={<Home/>}/>
   <Route path='/add' element={<Add/>}/>
    </Routes>
    
    </>
  )
}

export default App
