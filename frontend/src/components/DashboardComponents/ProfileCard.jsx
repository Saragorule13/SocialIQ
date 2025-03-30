import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProfileCard = () => {
  const username = useParams().username;
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/get-profiles/${username}`)
      .then((response) => {
        console.log("API Response:", response.data);
        if (response.data.data && response.data.data.length > 0) {
          setProfile(response.data.data[0]);  // Assuming one profile
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (!profile) {
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }


  return (
    <div className="flex flex-col md:flex-row p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-gray-200 dark:border-neutral-700">
      {/* Profile Image */}
      <div className="flex flex-col items-center md:w-1/3">
        <img
          src={profile.profilePicUrl}
          alt="Profile"
          className="w-32 h-32 rounded-full border-2 border-gray-300"
        />
        <div className="flex mt-2 space-x-2">
          <a href={profile.url} target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col md:w-2/3 md:ml-6 text-left">
        <h2 className="text-xl font-bold">{username}</h2>
        <h5 className="text-gray-500 text-lg">{profile.fullName}</h5>
        <p className="text-gray-600 dark:text-gray-400 w-[450px] mt-2">
          {profile.biography}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
