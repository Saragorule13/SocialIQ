import React from 'react'
import DashboardControls from './DashboardControls'
import ProfileCard from './ProfileCard'
import InfoCards from './InfoCards'
import StatsGrid from './StatsGrid'
import RecentPostsAnalysis from './RecentPostsAnalysis'
import PostCharts from './PostCharts'

export default function Mainboard() {
  return (
    <div className='flex flex-col bg-black w-full p-6 gap-6 lg:ml-[30vh]'>
      {/* <DashboardControls/> */}
      <ProfileCard/>
      <StatsGrid/>
      <PostCharts/>
      <RecentPostsAnalysis/>
      <RecentPostsAnalysis/>
    </div>
  )
}
