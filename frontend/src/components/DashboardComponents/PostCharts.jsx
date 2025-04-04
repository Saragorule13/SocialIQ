import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

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
        data: [
          profile.followersCount,
          profile.followersCount - 1000000,
          profile.followersCount - 2000000,
        ], // Example data
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Top Performing Posts Data
  const topPostsData = {
    labels:
      profile.latestPosts?.map((_, index) => `Post ${index + 1}`) || [
        "Post 1",
        "Post 2",
        "Post 3",
      ], // Post labels as "Post 1", "Post 2", etc.
    datasets: [
      {
        label: "Likes",
        data:
          profile.latestPosts?.map((post) => post.likesCount) || [
            1200,
            1700,
            800,
          ], // Likes count
        backgroundColor: "#8B5CF6",
      },
    ],
  };

  // Comments Count Data for Pie Chart
  const commentsData = {
    labels:
      profile.latestPosts?.map((_, index) => `Comment ${index + 1}`) || [
        "Comment 1",
        "Comment 2",
        "Comment 3",
      ], // Comment labels as "Comment 1", "Comment 2", etc.
    datasets: [
      {
        label: "Comments",
        data:
          profile.latestPosts?.map((post) => post.commentsCount) || [
            300,
            450,
            200,
          ], // Comments count
        backgroundColor: ["#F87171", "#34D399", "#60A5FA"], // Colors for each slice
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Engagement Trends Chart */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200/30 dark:border-neutral-700/30 p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Engagement Trends
          </h3>
        </div>
        <Line
          data={engagementData}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
          }}
        />
      </div>

      {/* Top Performing Posts Chart */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200/30 dark:border-neutral-700/30 p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Top Performing Posts
          </h3>
        </div>
        <Bar
          data={topPostsData}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
          }}
        />
      </div>

      {/* Comments Count Pie Chart */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200/30 dark:border-neutral-700/30 p-5 md:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Comments Distribution
          </h3>
        </div>
        <div className="h-64"> {/* Set a fixed height for the pie chart */}
          <Pie
            data={commentsData}
            options={{
              responsive: true,
              maintainAspectRatio: false, // Allow the chart to resize based on the container
              plugins: {
                legend: {
                  display: true,
                  position: "bottom",
                  labels: {
                    color: "#6B7280", // Adjust legend text color
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PostCharts;