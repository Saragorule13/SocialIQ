import React from 'react'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import UserInfo from './pages/UserInfo'
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/user-info' element={<UserInfo/>}/>
      </Routes>
    </>
  )
}

export default App

