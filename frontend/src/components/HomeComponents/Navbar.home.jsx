import React from 'react'
import assets from '../../assets/assets.js'

export default function Navbar() {
  return (
    <div className="h-[10vh] flex items-center justify-between p-[20px]">
      <div className='flex items-center gap-[11px]'>
        <img src={assets.logo} alt="logo" className="w-12 h-12"/>
        <p className='text-[#bd9fc0] text-[32px] font-bold'>SocialIQ</p>
      </div>

      <div className='gap-[20px] hidden md:flex md:gap-10 text-[#6b5e5e]'>
        <p>Home</p>
        <p>Features</p>
        <p>Analytics</p>
        <p>FAQs</p>
        <p>Contact</p>
      </div>

      <div className='flex gap-[29px]'>
        <button className='w-[107px] h-[38px] bg-[#603636]/0 rounded-[25px] border border-black'>Login</button>
        <button className='w-[107px] h-[37px] bg-[#bd9fc0] rounded-[25px] text-white'>Sign Up</button>
      </div>
    </div>
  )
}
