import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProfileCard = () => {
  const username = useParams().username;
  const [profile, setProfile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    // Fetch profile data
    axios
      .get(`http://127.0.0.1:8000/get-profiles/${username}`)
      .then((response) => {
        console.log("API Response:", response.data);
        if (response.data.data) {
          setProfile(response.data.data); // Set the profile directly
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // Fetch profile image
    axios
      .get(`https://socialiq-568543231418.asia-south1.run.app/image/${username}`, {
        responseType: "blob", // Ensure the response is treated as a binary blob
      })
      .then((response) => {
        const imageUrl = URL.createObjectURL(response.data); // Convert blob to object URL
        setProfileImage(imageUrl);
      })
      .catch((error) => {
        console.error("Error fetching profile image:", error);
      });
  }, [username]);

  if (!profile) {
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center p-8 bg-neutral-800 rounded-lg shadow-md border border-gray-700 gap-8">
      {/* Profile Image */}
      <div className="flex-shrink-0">
        <img
          src={profileImage || "https://via.placeholder.com/150"} // Fallback to placeholder if image is not available
          alt="Profile"
          className="w-64 h-64 rounded-full border-4 border-gray-600 shadow-md"
        />
      </div>

      {/* Greeting and Analysis */}
      <div className="flex flex-col text-left text-gray-200 space-y-4">
        <h1 className="text-4xl font-extrabold">
          Hello, <span className="text-gray-300">{username}</span>!
        </h1>
        <p className="text-lg">
          Your account did{" "}
          <span className="font-semibold text-green-400">amazing</span> compared
          to last week. Keep up the fantastic work!
        </p>
        <p className="text-lg">
          Engagement rate increased by{" "}
          <span className="font-semibold text-blue-400">15%</span>.
        </p>
        <div className="mt-6 flex gap-4">
          <button className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md">
            View Insights
          </button>
          <button className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;