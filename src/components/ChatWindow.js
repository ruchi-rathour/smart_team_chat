import React, { useEffect, useMemo, useRef, useState } from "react";
import { findChatById } from "../data/dummyData";

const ChatWindow = ({ chatId, onBack }) => {
  const chat = findChatById(chatId) || {
    id: "temp",
    name: "Conversation",
    messages: [],
  };

  // State for AI summary, fade-in visibility, suggested reply, and input field
  const [assistantOutput, setAssistantOutput] = useState("");
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [suggestedReply, setSuggestedReply] = useState("");
  const [input, setInput] = useState("");

  const scrollRef = useRef(null);

  
  const headerTitle = useMemo(() => chat.name || "Conversation", [chat.name]);


  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatId]);


  const handleSummarize = () => {
    setAssistantOutput("Summary: This chat is about project updates.");
    setSummaryVisible(false);
    requestAnimationFrame(() => setSummaryVisible(true)); // Fade-in effect
  };

  const handleSmartReply = () => {
    setSuggestedReply("Sure, I’ll handle that!");
    requestAnimationFrame(() => {
      if (scrollRef.current)
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    });
  };

  return (
    <div className="h-screen w-full flex flex-col bg-white">
      {/* Header section */}
      <div className="bg-gradient-to-r from-green-600 bg-indigo-500 text-white px-3 py-2 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <div>
            <div className="font-semibold leading-5">{headerTitle}</div>
            <div className="text-xs text-white/80">online</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Back button (only if onBack is provided) */}
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-white/10"
              aria-label="Back"
            >
              ←
            </button>
          )}
          <button
            type="button"
            className="p-2 rounded-full hover:bg-white/10"
            aria-label="More"
          >
            ⋮
          </button>
        </div>
      </div>

      {/* Messages section */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2">
        {chat.messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${
              m.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                m.sender === "me" ? "bg-emerald-600 text-white" : "bg-gray-200"
              } rounded-2xl px-3 py-2 max-w-xs`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* AI actions section */}
      <div className="px-3 pb-2">
        <div className="flex gap-2">
          <button
            onClick={handleSummarize}
            className="flex-1 rounded-xl bg-emerald-600 text-white px-3 py-2"
          >
            Summarize Thread
          </button>
          <button
            onClick={handleSmartReply}
            className="flex-1 rounded-xl bg-indigo-500 text-white px-3 py-2"
          >
            Smart Reply Suggestion
          </button>
        </div>

        {assistantOutput && (
          <div
            className={`mt-2 rounded-xl bg-green-50 p-2 text-sm ${
              summaryVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {assistantOutput}
          </div>
        )}
      </div>

      {/* Suggested reply display */}
      {suggestedReply && (
        <div className="px-3 pb-2 text-sm text-gray-700">
          Suggestion: {suggestedReply}
        </div>
      )}

      {/* Input section */}
      <div className="flex items-center p-2 border-t gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          className="flex-1 border rounded-full px-3 py-2 text-sm"
        />
        <button className="bg-indigo-500 text-white rounded-full px-4 py-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
