import React from "react";

const ProfileCard = () => {
  return (
    <div className="flex flex-col md:flex-row p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-gray-200 dark:border-neutral-700">
      {/* Profile Image */}
      <div className="flex flex-col items-center md:w-1/3">
        <img
          src="https://scontent-iad3-2.xx.fbcdn.net/v/t51.2885-15/472414937_946044723773168_5115227853981483495_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7d201b&_nc_ohc=mAk0n51-OjwQ7kNvgGv9zOf&_nc_oc=Adjr2BkJWSCjGIsdsxFiUb3f7iGguN2UsqLWcLvjXn9HXFcv8FCe3DolarBNIiTMYmU&_nc_zt=23&_nc_ht=scontent-iad3-2.xx&edm=AL-3X8kEAAAA&oh=00_AYEQRwfp_vwfuZ1Mk-NvX4qt2Iz05Dmw96_2OBCpw5VFcA&oe=67DD91FF"
          alt="Profile"
          className="w-32 h-32 rounded-full border-2 border-gray-300"
        />
        <div className="flex mt-2 space-x-2">
          <a href="https://www.instagram.com/awkwardgoat3/" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col md:w-2/3 md:ml-6 text-left">
        <h2 className="text-xl font-bold">awkwardgoat3</h2>
        <h5 className="text-gray-500 text-lg">Divija Bhasin | Mental Health</h5>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          🐐 Your Friendly Therapist, Mamagoat, a Swiftie🧣<br />
          💜 Founder: @thefriendlycouch | @this.is.kinda.lit <br />
          📧 divijabhasin@gmail.com | 📌 Delhi
        </p>
        <a href="https://youtu.be/sPeiac_-mNM?si=30ri0WP_i2kCd7EZ" className="text-blue-500 mt-2" target="_blank" rel="noopener noreferrer">
          YouTube Video
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;
