import React, { useState, useEffect } from 'react'
import DashboardControls from './DashboardControls'
import ProfileCard from './ProfileCard'
import InfoCards from './InfoCards'
import StatsGrid from './StatsGrid'
import RecentPostsAnalysis from './RecentPostsAnalysis'
import PostCharts from './PostCharts'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Mainboard() {
  const username = useParams().username;
  const [profile, setProfile] = useState(null);

  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/get-profiles/${username}`)
    .then((response)=>{
      console.log("API Response:", response.data);
      if (response.data.data) {
        setProfile(response.data.data); // Set the profile directly
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [username])

  if (!profile) {
    return <p className="text-center text-gray-500">Loading dashboard...</p>;
  }

  return (
    <div className='flex flex-col bg-black w-full p-6 gap-6 lg:ml-[30vh]'>
      {/* <DashboardControls/> */}
      <ProfileCard/>
      <StatsGrid/>
      <PostCharts profile={profile}/>
      <RecentPostsAnalysis profile={profile}/>
      {/* <RecentPostsAnalysis profile={profile}/> */}
    </div>
  )
}
