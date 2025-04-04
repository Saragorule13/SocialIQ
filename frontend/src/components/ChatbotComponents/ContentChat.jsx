import React, { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import assets from "../../assets/assets";
import "./Chat.css";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown"; // For rendering Markdown

const ai = new GoogleGenAI({ apiKey: "AIzaSyDMPVzecZqWLK_G5Xj8QWCa2iVfdnZEsPs" });

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMainContainer, setShowMainContainer] = useState(true);
  const chatMessagesRef = useRef(null);
  const username = useParams().username;

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSendMessage = async () => {
    if (loading || !userInput.trim()) return;

    setShowMainContainer(false);
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: userInput,
      });

      const botResponse = response.text || "No response received.";
      setMessages((prev) => [...prev, { role: "bot", content: botResponse }]);
    } catch (error) {
      console.error("Error generating content:", error);

      let errorMessage = "An error occurred";
      if (error.response) {
        errorMessage =
          error.response.data?.detail ||
          error.response.statusText ||
          JSON.stringify(error.response.data);
      } else if (error.request) {
        errorMessage = "No response received from server";
      } else {
        errorMessage = error.message;
      }

      setMessages((prev) => [...prev, { role: "bot", content: errorMessage }]);
    } finally {
      setLoading(false);
      setUserInput("");
    }
  };

  return (
    <div className="bg-black chat relative w-full h-screen text-white flex flex-col justify-between">
      {/* Main Container */}
      <div className="Main">
        {showMainContainer && (
          <div className="main-container">
            {/* Add any marquee or introductory content here */}
          </div>
        )}

        {/* Chat Messages */}
        <div
          className="chat-messages flex flex-col p-10 gap-4 overflow-y-auto"
          ref={chatMessagesRef}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.role === "user" ? "user-message" : "bot-message"
              }`}
            >
              {message.role === "bot" ? (
                <ReactMarkdown>{message.content}</ReactMarkdown>
              ) : (
                message.content
              )}
            </div>
          ))}
          {loading && <div className="bot-message">Typing...</div>}
        </div>
      </div>

      {/* Input Section */}
      <div className="main-bottom bg-white bottom-0">
        <div className="search-box flex items-center">
          <input
            type="text"
            placeholder="Ask SocialIQ..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && handleSendMessage()}
          />
          <img
            src={assets.send_icon}
            alt="send_icon"
            onClick={!loading ? handleSendMessage : undefined}
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
          />
        </div>
        <p className="bottom-info">
          Chatbot may display wrong info. Double-check the results.
        </p>
      </div>
    </div>
  );
}