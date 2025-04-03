import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const PostCharts = ({ profile }) => {
  if (!profile) {
    return <p className="text-center text-gray-500">Loading charts...</p>;
  }

  // Engagement Trends Data
  const engagementData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"], // Example months
    datasets: [
      {
        label: "Followers Count",
        data: [profile.followersCount, profile.followersCount - 1000000, profile.followersCount - 2000000], // Example data
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Top Performing Posts Data
  const topPostsData = {
    labels: profile.latestPosts?.map((post) => post.shortCode) || ["Post 1", "Post 2", "Post 3"], // Post short codes
    datasets: [
      {
        label: "Likes",
        data: profile.latestPosts?.map((post) => post.likesCount) || [1200, 1700, 800], // Likes count
        backgroundColor: "#8B5CF6",
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Engagement Trends Chart */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200/30 dark:border-neutral-700/30 p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Engagement Trends</h3>
        </div>
        <Line data={engagementData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>

      {/* Top Performing Posts Chart */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200/30 dark:border-neutral-700/30 p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Top Performing Posts</h3>
        </div>
        <Bar data={topPostsData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>
    </div>
  );
};

export default PostCharts;