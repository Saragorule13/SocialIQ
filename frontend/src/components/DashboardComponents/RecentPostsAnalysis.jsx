import React from "react";

const posts = [
  {
    title: "New Product Launch",
    description: "Introducing our latest product line...",
    platform: "Instagram",
    platformColor: "bg-pink-500",
    date: "Aug 28, 2023",
    likes: "2,458",
    comments: "183",
    shares: "56",
    performance: "Good",
    performanceColor: "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400",
  },
  {
    title: "Customer Spotlight",
    description: "Meet one of our valued customers...",
    platform: "LinkedIn",
    platformColor: "bg-blue-600",
    date: "Aug 25, 2023",
    likes: "1,247",
    comments: "97",
    shares: "42",
    performance: "Good",
    performanceColor: "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400",
  },
  {
    title: "Industry News",
    description: "Breaking updates from our industry...",
    platform: "Twitter",
    platformColor: "bg-blue-400",
    date: "Aug 21, 2023",
    likes: "843",
    comments: "56",
    shares: "127",
    performance: "Average",
    performanceColor: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400",
  },
  {
    title: "Company Update",
    description: "Important announcement about our team...",
    platform: "Facebook",
    platformColor: "bg-blue-800",
    date: "Aug 18, 2023",
    likes: "576",
    comments: "23",
    shares: "15",
    performance: "Low",
    performanceColor: "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400",
  },
  {
    title: "Product Tutorial",
    description: "Learn how to get the most out of...",
    platform: "Instagram",
    platformColor: "bg-pink-500",
    date: "Aug 15, 2023",
    likes: "1,867",
    comments: "132",
    shares: "48",
    performance: "Good",
    performanceColor: "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400",
  },
];

const RecentPostsAnalysis = () => {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200/30 dark:border-neutral-700/30 p-5 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Posts Analysis</h3>
        <div className="flex space-x-2">
          <button className="px-3 py-1.5 text-sm font-medium rounded border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700/30 text-gray-600 dark:text-gray-300">Export CSV</button>
          <button className="px-3 py-1.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded">View All</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700/30">
          <thead className="bg-gray-50 dark:bg-neutral-800">
            <tr>
              {['Post', 'Platform', 'Date', 'Likes', 'Comments', 'Shares', 'Performance'].map((heading) => (
                <th key={heading} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-neutral-800 divide-y divide-gray-200 dark:divide-neutral-700/30">
            {posts.map((post, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded bg-gray-100 dark:bg-neutral-700"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{post.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{post.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`h-4 w-4 rounded-full ${post.platformColor} mr-2`}></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{post.platform}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{post.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{post.likes}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{post.comments}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{post.shares}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.performanceColor}`}>
                    {post.performance}
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
