import React from 'react';
import assets from '../../assets/assets.js';

export default function Navbar() {
  return (
    <div className="h-[10vh] bg-[#030014] flex items-center justify-between p-[20px]">
      {/* Logo Section */}
      <div className="flex items-center gap-[11px]">
        <img src={assets.logo} alt="logo" className="w-12 h-12" />
        <p className="text-white text-[32px] font-bold">SocialIQ</p>
      </div>

      {/* Navigation Items */}
      <div className="gap-[20px] hidden md:flex md:gap-10 text-white">
        {['Home', 'Features', 'Analytics', 'FAQs', 'Contact'].map((item, index) => (
          <p
            key={index}
            className="cursor-pointer transition-transform duration-300 hover:-translate-y-1"
          >
            {item}
          </p>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-[20px]">
        <button className="w-[107px] h-[38px] bg-white text-black rounded-[25px] border border-black shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
          Login
        </button>
        <button className="w-[107px] h-[37px] bg-white text-black rounded-[25px] shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
          Sign Up
        </button>
      </div>
    </div>
  );
}