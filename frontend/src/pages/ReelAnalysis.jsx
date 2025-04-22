import React, { useState } from 'react';

const ReelAudioAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return alert("Please upload an audio file.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("https://socialiq-568543231418.asia-south1.run.app/video-analysis", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error("Error uploading audio:", err);
      alert("Something went wrong!");
    }
  };

  // Function to convert markdown-like syntax to HTML tags
  const convertMarkdownToHTML = (text) => {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold (**
      .replace(/\*(.*?)\*/g, '<em>$1</em>'); // Italic (*)
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-8 bg-gray-800 p-10 rounded-xl shadow-xl">
        {/* Home Button */}
        <a
          href="/"
          className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transform transition-all hover:scale-105"
        >
          Home
        </a>

        <h2 className="text-3xl font-extrabold text-center mb-6">Reel Audio Analyzer</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="block w-full bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 transition-all hover:bg-gray-600"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-all hover:scale-105"
            >
              Analyze
            </button>
          </div>
        </form>
        {response && (
          <div className="mt-6 bg-gray-700 p-4 rounded-lg overflow-auto max-h-96">
            <h3 className="text-lg font-semibold text-blue-400">Analysis Result:</h3>
            <div className="text-sm text-gray-200 whitespace-pre-wrap break-words" dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(response) }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReelAudioAnalyzer;
