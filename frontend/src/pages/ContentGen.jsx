import React from 'react'
import Chat from '../components/ChatbotComponents/ContentChat'
import Navbar from '../components/ChatbotComponents/ContentNav'


export default function ContentGen() {
  return (
    <div className='flex'>
      <Navbar/>
      <Chat/>
    </div>
  )
}
