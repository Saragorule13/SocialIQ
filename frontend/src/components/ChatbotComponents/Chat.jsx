import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import assets from "../../assets/assets";
import './Chat.css';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMainContainer, setShowMainContainer] = useState(true);
  const chatMessagesRef = useRef(null);

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
      const response = await fetch(
        `http://127.0.0.1:8000/chat/taylorswift`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: userInput }),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Request failed");
      }
  
      const data = await response.json();
      // Access the 'answer' field from FastAPI response
      setMessages((prev) => [...prev, { role: "bot", content: data.answer }]);
    } catch (error) {
      console.error("Full error:", error);
      setMessages((prev) => [
        ...prev,
        { 
          role: "bot", 
          content: error.message.includes("Failed to fetch") 
            ? "Connection error - check if backend is running" 
            : error.message 
        },
      ]);
    } finally {
      setLoading(false);
      setUserInput("");
    }
  };

  return (
    <div className="bg-black chat relative w-full h-screen text-white flex flex-col justify-between">
      <div className="Main">
        {showMainContainer && (
          <div className="main-container">
            {/* ... (keep marquee elements exactly as they were) */}
          </div>
        )}

        <div 
          className="chat-messages flex flex-col gap-4 overflow-y-auto"
          ref={chatMessagesRef}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.role === "user" ? "user-message" : "bot-message"
              }`}
            >
              {message.content}
            </div>
          ))}
          {loading && <div className="bot-message">Typing...</div>}
        </div>
      </div>

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
        <p className="bottom-info">Chatbot may display wrong info. Double-check the results.</p>
      </div>
    </div>
  );
}