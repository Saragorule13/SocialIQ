import React from 'react'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import UserInfo from './pages/UserInfo'
import {Routes, Route} from 'react-router-dom'
import Demo from './pages/Demo'
import Chatbot from './pages/Chatbot'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard/:username' element={<Dashboard/>}/>
        <Route path='/user-info' element={<UserInfo/>}/>
        <Route path='/demo' element={<Demo/>}/>
        <Route path='/chat' element={<Chatbot/>}/>
      </Routes>
    </>
  )
}

export default App

