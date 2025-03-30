import React, { useState } from "react";
import assets from "../../assets/assets";
import './Navbar.css'

const Navbar = () => {
  const [extended, setExtended] = useState(false);
 

  function showSideBar(){
    const sidebar = document.querySelector('.Navbar');
    sidebar.style.display = 'flex'
  }

  return (
    
    <div className="flex flex-col">
    

    <div className="Navbar flex-col">
    <img
          className="mobile-ham menu w-8"
          onClick = {()=>showSideBar()}
          src={assets.menu_icon}
          alt=""
        />
      <div className="top">
        <img
          className="menu"
          onClick={() => setExtended((prev) => !prev)}
          src={assets.menu_icon}
          alt=""
        />
        <div className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? 
          <div className="recent">
            
            <p className="recent-title">Recent</p>
            
                <div className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>History</p>
                </div>
            
          </div>
         : null}
      </div>

      <div className="bottom flex flex-col gap-5 items-start">
        <div className="bottom-item flex gap-2 cursor-pointer">
          <img src={assets.settings_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
        <div className="bottom-item flex gap-2 cursor-pointer">
          <img src={assets.github_icon} alt="" />
          {extended ? (
            <p>
              <a href="https://github.com/Saragorule13">Github</a>
            </p>
          ) : null}
        </div>
        <div className="bottom-item flex gap-2 cursor-pointer">
          <img src={assets.instagram_icon} alt="" />
          {extended ? (
            <p>
              <a href="https://www.instagram.com/imsarssss/">Instagram</a>
            </p>
          ) : null}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Navbar;