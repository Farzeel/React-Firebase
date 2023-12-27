import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {BrowserRouter as Router , Routes, Route} from "react-router-dom"
import Home from './pages/Home/Home'
import Login from './pages/Login'
import CreatePost from './pages/createPost/CreatePost'
import Navbar from './components/Navbar'

function App() {


  return (
    <>
    
<Router>
  <Navbar/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/createpost' element={<CreatePost/>}/>
  </Routes>
</Router>

    </>
  )
}

export default App
