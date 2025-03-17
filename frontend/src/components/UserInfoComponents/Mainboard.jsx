import React from "react";

export default function Mainboard() {
  return (
    <div className="flex text-white flex-col bg-black w-full p-6 gap-6 lg:ml-[30vh]">
      {/* Header */}
      <div className="flex justify-between">
        <p className="text-2xl">Tracked Accounts</p>
        
      </div>

      <div className="flex justify-between gap-2">
        {/* Input Field */}
      <div className=" flex-1">
        <input
          type="text"
          placeholder="Enter Instagram username (e.g., cristiano)"
          className="w-full text-white p-2 border border-gray-300 dark:border-gray-600 rounded-md  focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <button className="bg-white p-2 rounded-md text-black">
          Add Accounts
        </button>
      </div>

      {/* Main Table Section */}
      <div className="p-6 bg-white dark:bg-neutral-900">
        {/* Header Controls */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
              <span className="material-icons">menu</span> All Accounts
            </button>
            <button className="bg-transparent text-purple-600 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md p-2">
              <span className="material-icons">download</span>
            </button>
          </div>
          <div className="flex gap-3">
            <button className="bg-gray-700 text-white px-4 py-2 rounded-md">
              Sort Method
            </button>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-md">
              Last 7 Days
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200/30 dark:border-neutral-700/30 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-neutral-800 text-left">
              <tr>
                {[
                  "Account",
                  "Followers Count",
                  "Following Count",
                  "Media Count",
                  "Engagement Rate",
                  "Groups",
                  "Actions",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 uppercase"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t dark:border-neutral-700">
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      awkwardgoat3
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Divija Bhasin | Men...
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">
                  295,401
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  818
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  1,239
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  4.99%
                </td>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">
                  <button className="bg-gray-600 text-white px-2 py-1 rounded-md">
                    <span className="material-icons">menu</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
