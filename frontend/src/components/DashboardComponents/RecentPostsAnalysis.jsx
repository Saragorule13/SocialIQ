import React from "react";

const RecentPostsAnalysis = ({ profile }) => {
  if (!profile || !profile.latestPosts) {
    return <p className="text-center text-gray-500">Loading recent posts...</p>;
  }

  // Function to export data as CSV
  const exportToCSV = () => {
    const headers = ["Caption", "Likes", "Comments", "Shares", "Date"];
    const rows = profile.latestPosts.map((post) => [
      post.caption ? post.caption.replace(/,/g, "") : "No Caption", // Remove commas to avoid CSV issues
      post.likesCount || 0,
      post.commentsCount || 0,
      post.shares || 0,
      new Date(post.timestamp).toLocaleDateString() || "N/A",
    ]);

    const csvContent = [
      headers.join(","), // Add headers
      ...rows.map((row) => row.join(",")), // Add rows
    ].join("\n");

    // Create a Blob and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "recent_posts.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200/30 dark:border-neutral-700/30 p-5 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Posts Analysis</h3>
        <div className="flex space-x-2">
          <button
            onClick={exportToCSV}
            className="px-3 py-1.5 text-sm font-medium rounded border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700/30 text-gray-600 dark:text-gray-300"
          >
            Export CSV
          </button>
          <button className="px-3 py-1.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded">
            View All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700/30">
          <thead className="bg-gray-50 dark:bg-neutral-800">
            <tr>
              {["Caption", "Likes", "Comments", "Shares", "Date", "Performance"].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-neutral-800 divide-y divide-gray-200 dark:divide-neutral-700/30">
            {profile.latestPosts.map((post, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {post.caption ? `${post.caption.slice(0, 50)}${post.caption.length > 50 ? "..." : ""}` : "No Caption"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{post.likesCount || 0}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{post.commentsCount || 0}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{post.shares || 0}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{new Date(post.timestamp).toLocaleDateString() || "N/A"}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                    Good
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentPostsAnalysis;