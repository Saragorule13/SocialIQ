import React from "react";
import { useParams } from "react-router-dom";

const Sidebar = () => {
  const username = useParams().username;
  return (
    <nav className="fixed flex flex-col w-[30vh] h-screen bg-[#262626] border-r border-neutral-200/20 dark:border-neutral-700/30 z-50">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-neutral-200/20 dark:border-neutral-700/30">
        <div className="flex items-center">
          <span className="ml-2 text-xl font-bold text-white">SocialIQ</span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-1 px-4 ">
          {[
            { name: "Accounts", href: "/user-info", icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" },
            { name: "Chatbot", href: `/chat/${username}`, icon: "M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" },
            { name: "Sentiment Analysis", href: "#reports", icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H6v-2h6v2zm4-4H6v-2h10v2zm0-4H6V7h10v2z" },
            { name: "Settings", href: "#settings", icon: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" }
          ].map((item) => (
            <li key={item.name}>
              <a href={item.href} className="flex items-center px-4 py-3 text-white hover:bg-gray-100 dark:hover:bg-neutral-700/30 rounded-lg transition-all duration-200">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d={item.icon} />
                </svg>
                <span className="ml-3 font-medium">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* User Profile */}
      <div className="px-4 py-4 border-t border-neutral-200/20 dark:border-neutral-700/30">
        <div className="flex items-center">
          <img src="https://avatar.iran.liara.run/public" alt="User profile" className="w-10 h-10 rounded-full" />
          <div className="ml-3">
            <p className="text-sm font-medium text-white">John Smith</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">john@socialiq.io</p>
          </div>
          <button type="button" className="ml-auto p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-700/30 transition-all duration-200">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42A6.92 6.92 0 0 1 19 12c0 3.87-3.13 7-7 7A6.995 6.995 0 0 1 7.58 6.58L6.17 5.17A8.932 8.932 0 0 0 3 12a9 9 0 0 0 18 0c0-2.74-1.23-5.18-3.17-6.83z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
