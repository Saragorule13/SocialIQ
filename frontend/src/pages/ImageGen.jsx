import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";

export default function ImageGen() {
    const [prompt, setPrompt] = useState("");
    const [imageSrc, setImageSrc] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError("Prompt cannot be empty.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const ai = new GoogleGenAI({ apiKey: "AIzaSyDMPVzecZqWLK_G5Xj8QWCa2iVfdnZEsPs" }); // Replace with your actual API key

            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash-exp-image-generation",
                contents: prompt,
                config: {
                    responseModalities: ["Text", "Image"],
                },
            });

            const part = response.candidates[0].content.parts.find((p) => p.inlineData);
            if (part && part.inlineData) {
                const imageData = part.inlineData.data;
                setImageSrc(`data:image/png;base64,${imageData}`);
            } else {
                setError("No image received from the server.");
            }
        } catch (err) {
            console.error("Error generating image:", err);
            setError(err.message || "Failed to generate image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-bold mb-6">AI Image Generator</h1>
            <div className="w-full max-w-md">
                <input
                    type="text"
                    placeholder="Enter a prompt..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleGenerate}
                    className={`w-full mt-4 p-3 rounded-md text-white font-semibold ${
                        loading
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    disabled={loading}
                >
                    {loading ? "Generating..." : "Generate Image"}
                </button>
                {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
            </div>

            {imageSrc && (
                <div className="mt-10 text-center">
                    <h2 className="text-xl font-semibold mb-4">Generated Image:</h2>
                    <img
                        src={imageSrc}
                        alt="AI Generated"
                        className="w-96 rounded-lg border border-gray-700 shadow-lg"
                    />
                    <a
                        href={imageSrc}
                        download="generated-image.png"
                        className="inline-block mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
                    >
                        Download Image
                    </a>
                </div>
            )}
        </div>
    );
}