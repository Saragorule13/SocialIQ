import React from 'react'
import Sidebar from '../components/DashboardComponents/Sidebar'
// import Chat from '../components/ChatbotComponents/Chat'
import Navbar from '../components/ChatbotComponents/Navbar'
import Chat from '../components/ChatbotComponents/Chat'


export default function Chatbot() {
  return (
    <div className='flex'>
      <Navbar/>
      <Chat/>
    </div>
  )
}
