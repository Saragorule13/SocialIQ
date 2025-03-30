import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    // Function to reset chat
    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setRecentPrompt("");
        setResultData("");
    };

    // Function to send user input to the backend API
    const onSent = async (prompt) => {
        const userInput = prompt || input;
        if (!userInput.trim()) return;

        setResultData(""); // Clear previous response
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(userInput);
        setPrevPrompts((prev) => [...prev, userInput]);

        try {
            const response = await fetch(
                `https://levaithan-socialiq.hf.space/chat/taylorswift`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ question: userInput }),
                }
            );

            if (!response.ok) throw new Error("Failed to fetch response");

            const data = await response.json();
            setResultData(data.response || "No response received.");
        } catch (error) {
            console.error("Error:", error);
            setResultData("Error fetching response. Please try again.");
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        recentPrompt,
        setRecentPrompt,
        input,
        setInput,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        onSent,
        newChat,
    };

    return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;