import React from 'react'
import Sidebar from '../components/DashboardComponents/Sidebar'
import Mainboard from '../components/UserInfoComponents/Mainboard'

export default function UserInfo() {
  return (
    <div className='bg-black h-screen flex'>
      <Sidebar/>
      <Mainboard/>
    </div>
  )
}
