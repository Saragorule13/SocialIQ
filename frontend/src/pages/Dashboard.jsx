import React from 'react'
import Sidebar from '../components/DashboardComponents/Sidebar'
import DashboardControls from '../components/DashboardComponents/DashboardControls'
import Mainboard from '../components/DashboardComponents/Mainboard'

function Dashboard() {
  return (
    <div className='flex items'>
      <Sidebar/>
      <Mainboard/>
    </div>
  )
}

export default Dashboard
