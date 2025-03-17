import React from "react";
import assets from "../../assets/assets";

export default function Hero() {
  return (
    <div className="h-[90vh] pt-0 pl-[30px] pr-[30px] pb-[30px]">
      <div className="bg-[#bd9fc0] h-full rounded-[45px] flex flex-col items-center justify-center gap-5 relative">
        <div className="flex gap-[48px]">
          <img
            className="w-[48px] h-[48px]"
            src={assets.facebook_logo}
            alt=""
          />
          <img
            className="w-[48px] h-[48px]"
            src={assets.instagram_logo}
            alt=""
          />
          <img
            className="w-[48px] h-[48px]"
            src={assets.pinterest_logo}
            alt=""
          />
          <img className="w-[48px] h-[48px]" src={assets.tiktok_logo} alt="" />
          <img className="w-[48px] h-[48px]" src={assets.youtube_logo} alt="" />
          <img className="w-[48px] h-[48px]" src={assets.twitter_logo} alt="" />
        </div>

        {/* <div className='w-[1155px] text-center text-[64px] font-semibold text-white leading-18'>
          <p>Manage all your <span>Socials</span> at <span>one place</span> using <span>Social</span>IQ</p>
        </div> */}

        <div className="maintext w-[1155px] text-center">
          <span class="text-white text-[64px] font-semibold font-['Poppins'] leading-[65.28px]">
            Manage all your
          </span>
          <span class="text-black text-[64px] font-semibold font-['Poppins'] leading-[65.28px]">
            {" "}
          </span>
          <span class="text-white/0 text-[64px] font-semibold font-['Poppins'] leading-[65.28px]">
            S
          </span>
          <span class="text-black/0 text-[64px] font-semibold font-['Poppins'] leading-[65.28px]">
            ocials
          </span>
          <span class="text-black text-[64px] font-semibold font-['Poppins'] leading-[65.28px]">
            {" "}
          </span>
          <span class="text-white text-[64px] font-semibold font-['Poppins'] leading-[65.28px]">
            at
          </span>
          <span class="text-black text-[64px] font-semibold font-['Poppins'] leading-[65.28px]">
            {" "}
          </span>
          <span class="text-black/0 text-[64px] font-semibold font-['Poppins'] leading-[65.28px]">
            one place
          </span>
          <span class="text-black text-[64px] font-semibold font-['Poppins'] leading-[65.28px]">
            {" "}
          </span>
          <span class="text-white text-[64px] font-semibold font-['Poppins'] leading-[65.28px]">
            with
          </span>
          <span class="text-black text-[64px] font-semibold font-['Poppins'] leading-[65.28px]">
            {" "}
          </span>
          <span class="text-black/0 text-[64px] font-semibold font-['Poppins'] leading-[65.28px]">
            Social
          </span>
          <span class="text-white text-[64px] font-semibold font-['Poppins'] leading-[65.28px]">
            IQ
          </span>
          <span class="text-black/0 text-[64px] font-semibold font-['Poppins'] leading-[65.28px]">
            {" "}
          </span>
        </div>

        {/* get started button */}

        <div>
          <button className="w-[215px] h-[66px] bg-white rounded-[37px] border border-[#6b5e5e] cursor-pointer">
            <a href="/dashboard">Get Started</a>
          </button>
        </div>

        {/* illustrations  */}
        <div className="overflow-hidden absolute left-0 bottom-0 w-[265px] h-[300px] hidden md:block">
          <img
            className="w-full h-full object-cover"
            src={assets.illustration1}
            alt=""
          />
        </div>

        <div className="overflow-hidden absolute right-0 bottom-0 w-[300px] h-[350px] hidden md:block">
          <img
            className="w-full h-full object-cover"
            src={assets.illustration2}
            alt=""
          />
        </div>

        {/* <img className="absolute right-0 w-[362.45px] h-[485.36px] bottom-[-120px] overflow-hidden" src={assets.illustration2} alt="" /> */}
      </div>
    </div>
  );
}
