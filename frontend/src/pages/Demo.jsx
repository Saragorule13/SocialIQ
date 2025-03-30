import { useEffect, useState } from "react";
import axios from "axios";

function Demo() {
  const [posts, setPosts] = useState([]); // Update state to handle an array of posts

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/get-data")
      .then((response) => {
        console.log("API Response:", response.data); // Debugging log
        setPosts(response.data.data); // Set the array of posts
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (!posts || posts.length === 0) {
    console.log("Posts are not yet loaded");
    return <p>Loading...</p>; // Show loading until data is fetched
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-900 text-white rounded-lg shadow-md">
      {posts.map((post, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-bold mb-2">{post.ownerFullName || "Unknown"}</h2>
          <p className="text-sm text-gray-400">@{post.ownerUsername || "unknown"}</p>
          <img
            src={post.displayUrl}
            alt="Instagram Post"
            className="w-full h-auto my-4 rounded-md"
          />
          {post.type === "Video" && (
            <video controls className="w-full my-4 rounded-md">
              <source src={post.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <p className="mt-2">{post.caption}</p>
          <div className="mt-4 flex items-center">
            <span className="mr-2">
              ❤️ {post.likesCount ? post.likesCount.toLocaleString() : "0"}
            </span>
            <span>
              👁 {post.videoViewCount ? post.videoViewCount.toLocaleString() : "0"} views
            </span>
          </div>
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 text-blue-400 hover:underline"
          >
            View on Instagram
          </a>
        </div>
      ))}
    </div>
  );
}

export default Demo;