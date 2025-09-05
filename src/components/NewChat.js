import React, { useState } from "react";
import { addChat } from "../data/dummyData";

const NewChat = ({ onChatCreated }) => {
  const [name, setName] = useState("");
  const [suggestion, setSuggestion] = useState("");

  // Start a new chat with the given participant name
  const handleStartChat = () => {
    const participantName = name.trim() || "New Contact";
    const newChat = addChat(participantName);

    // Notify parent (App) about the new chat
    if (onChatCreated) {
      onChatCreated(newChat.id);
    }
  };

  const handleGenerateSuggestion = () => {
    setSuggestion("Hey! How’s your day going so far?");
  };

  return (
    <div className="h-full w-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-indigo-500 text-white px-3 py-2 flex items-center justify-between shadow-md">
        <div className="font-semibold">Start New Chat</div>
      </div>

      {/* Form */}
      <div className="p-4 space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter participant name"
          className="w-full border rounded-xl px-3 py-2"
        />

        <div className="flex gap-2">
          <button
            onClick={handleGenerateSuggestion}
            className="flex-1 rounded-xl bg-emerald-600 text-white px-3 py-2"
          >
            Suggest Opening Line
          </button>
          <button
            onClick={handleStartChat}
            className="flex-1 rounded-xl bg-indigo-500 text-white px-3 py-2"
          >
            Create Chat
          </button>
        </div>

        {/* Show the generated suggestion if available */}
        {suggestion && (
          <div className="rounded-xl bg-gray-100 p-3 text-sm">{suggestion}</div>
        )}
      </div>
    </div>
  );
};

export default NewChat;
