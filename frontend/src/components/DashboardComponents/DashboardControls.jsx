import React from "react";

const DashboardControls = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      {/* Search Bar */}
      <div className="w-full md:w-1/2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search dashboards, reports, users..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        {/* Platform Filter Dropdown */}
        <div className="relative w-full md:w-auto">
          <select className="appearance-none w-full md:w-48 pl-4 pr-10 py-2 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm">
            <option value="">All Platforms</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
            <option value="linkedin">LinkedIn</option>
            <option value="facebook">Facebook</option>
            <option value="tiktok">TikTok</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Date Range Picker */}
        <div className="relative w-full md:w-auto">
          <button className="inline-flex items-center justify-center w-full md:w-auto px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm">
            <span>Last 30 days</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <button className="relative p-2 bg-white dark:bg-neutral-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-neutral-700/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hidden dark:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 block dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DashboardControls;
