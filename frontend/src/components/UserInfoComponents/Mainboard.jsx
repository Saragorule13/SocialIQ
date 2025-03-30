import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Mainboard() {
  const [username, setUsername] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading
  const navigate = useNavigate();

  const handleRowClick = (account) => {
    navigate(`/dashboard/${account.username}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission

    if (!username.trim()) {
      setAlertMessage("Please enter a valid username.");
      return;
    }

    setLoading(true); // Start loading animation

    try {
      // Check if the username already exists in the database
      const existingProfileResponse = await axios.get(
        `http://127.0.0.1:8000/get-profiles/${username}`
      );

      if (existingProfileResponse.data.data.length > 0) {
        // If the username already exists, show an alert
        setAlertMessage("This username already exists in the database.");
      } else {
        // If the username does not exist, fetch and store the profile
        const fetchResponse = await axios.get(
          `http://127.0.0.1:8000/fetch-and-store-profile/${username}`
        );

        if (fetchResponse.data.error) {
          setAlertMessage(fetchResponse.data.error);
        } else {
          setAlertMessage("Profile fetched and stored successfully.");
          setAccounts((prev) => [
            ...prev,
            { username, ...fetchResponse.data.data[0].data },
          ]);
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setAlertMessage("An error occurred while fetching the profile.");
    } finally {
      setLoading(false); // Stop loading animation
    }

    setUsername(""); // Clear the input field
  };

  return (
    <div className="flex text-white flex-col bg-black w-full p-6 gap-6 lg:ml-[30vh]">
      {/* Header */}
      <div className="flex justify-between">
        <p className="text-2xl">Tracked Accounts</p>
      </div>

      {/* Input and Button */}
      <form onSubmit={handleSubmit} className="flex justify-between gap-2">
        {/* Input Field */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Enter Instagram username (e.g., cristiano)"
            className="w-full text-white p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <button
          type="submit"
          className="bg-white p-2 rounded-md text-black flex items-center justify-center"
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <div className="loader border-t-2 border-b-2 border-gray-900 w-4 h-4 rounded-full animate-spin"></div>
          ) : (
            "Add Account"
          )}
        </button>
      </form>

      {/* Alert Message */}
      {alertMessage && (
        <div className="mt-4 p-2 bg-yellow-500 text-black rounded-md">
          {alertMessage}
        </div>
      )}

      {/* Main Table Section */}
      <div className="p-6 bg-white dark:bg-neutral-900">
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
              {accounts.map((account, index) => (
                <tr key={index} onClick={() => handleRowClick(account)} className="border-t dark:border-neutral-700">
                  <td className="px-6 py-4">{account.username}</td>
                  <td className="px-6 py-4">{account.followersCount || "0"}</td>
                  <td className="px-6 py-4">{account.followsCount || "0"}</td>
                  <td className="px-6 py-4">{account.postsCount || "0"}</td>
                  <td className="px-6 py-4">{account.engagement || "85%"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}