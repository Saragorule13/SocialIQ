import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Mainboard() {
  const [username, setUsername] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInsertUsername = async (username) => {
    try {
      const response = await axios.post(
        "https://socialiq-568543231418.asia-south1.run.app/insert",
        { "username": {username} } // Send the username in the request body
      );
  
      if (response.data.success) {
        setAlertMessage(`Username "${username}" inserted successfully.`);
      } else {
        setAlertMessage(`Failed to insert username "${username}".`);
      }
    } catch (error) {
      console.error("Error inserting username:", error);
      setAlertMessage("An error occurred while inserting the username.");
    }
  };

  // Load accounts from local storage when the component mounts
  useEffect(() => {
    const savedAccounts = localStorage.getItem("accounts");
    if (savedAccounts) {
      setAccounts(JSON.parse(savedAccounts));
    }
  }, []);

  // Save accounts to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  const handleRowClick = (account) => {
    navigate(`/dashboard/${account.username}`);
  };

  const handleDelete = (usernameToDelete) => {
    // Remove the account from the list
    const updatedAccounts = accounts.filter(
      (account) => account.username !== usernameToDelete
    );
    setAccounts(updatedAccounts);
    setAlertMessage(`Account "${usernameToDelete}" has been deleted.`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!username.trim()) {
      setAlertMessage("Please enter a valid username.");
      return;
    }
  
    setLoading(true);
  
    try {
      const existingProfileResponse = await axios.get(
        `http://127.0.0.1:8000/get-profiles/${username}`
      );
  
      // Check if the response and data are valid
      if (
        existingProfileResponse.data &&
        existingProfileResponse.data.data &&
        existingProfileResponse.data.data.length > 0
      ) {
        setAlertMessage("This username already exists in the database.");
      } else {
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
      setLoading(false);
    }
  
    setUsername("");
  };
  

  const handleFetchPosts = async (username, posts) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/fetch/${username}/${posts}`
      );
      if (response.data) {
        console.log("Fetched Posts:", response.data);
        setAlertMessage(`Fetched ${posts} posts for "${username}".`);
      } else {
        setAlertMessage(`No posts found for "${username}".`);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setAlertMessage("An error occurred while fetching the posts.");
    }
  };

  return (
    <div className="flex text-white flex-col bg-black w-full p-6 gap-6 lg:ml-[30vh]">
      {/* Header */}
      <div className="flex justify-between">
        <p className="text-2xl">Tracked Accounts</p>
      </div>

      {/* Input and Button */}
      <form onSubmit={handleSubmit} className="flex justify-between gap-2">
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
          disabled={loading}
          onClick={() => handleInsertUsername({username})}
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
        <div className="mt-4 p-2 bg-yellow-500 text-black rounded-md flex justify-between items-center">
          <span>{alertMessage}</span>
          <button
            onClick={() => setAlertMessage("")} // Clear the alert message
            className="text-black font-bold px-2 hover:text-red-600"
          >
            X
          </button>
        </div>
      )}

      {/* Main Table Section */}
      <div className="p-6 bg-white dark:bg-neutral-900">
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
              {accounts.map((account, index) => (
                <tr
                  key={index}
                  className="border-t dark:border-neutral-700 cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-700"
                >
                  <td
                    className="px-6 py-4"
                    onClick={() => handleRowClick(account)}
                  >
                    {account.username}
                  </td>
                  <td className="px-6 py-4">{account.followersCount || "0"}</td>
                  <td className="px-6 py-4">{account.followsCount || "0"}</td>
                  <td className="px-6 py-4">{account.postsCount || "0"}</td>
                  <td className="px-6 py-4">{account.engagement || "85%"}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleDelete(account.username)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleFetchPosts(account.username, 5)} // Fetch 5 posts as an example
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    >
                      Fetch Posts
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}