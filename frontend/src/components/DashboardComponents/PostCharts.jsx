import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const engagementData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
  datasets: [
    {
      label: "Engagement Rate",
      data: [2, 3.5, 4.8, 6.2, 5.7, 7.1, 8.4, 7.9],
      borderColor: "#3B82F6",
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      tension: 0.4,
    },
  ],
};

const topPostsData = {
  labels: ["Post 1", "Post 2", "Post 3", "Post 4", "Post 5", "Post 6", "Post 7", "Post 8"],
  datasets: [
    {
      label: "Likes",
      data: [1200, 1700, 800, 1100, 1400, 600, 900, 400],
      backgroundColor: "#8B5CF6",
    },
  ],
};

const PostCharts = () => {
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
