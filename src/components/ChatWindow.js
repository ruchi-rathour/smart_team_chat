import React, { useMemo, useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { dummyThread } from "../data/dummyData";

const ChatWindow = ({ onBack, title }) => {
  const [assistantOutput, setAssistantOutput] = useState("");
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const scrollRef = useRef(null);

  const headerTitle = useMemo(() => title || "Conversation", [title]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, []);

  const handleSummarize = () => {
    setAssistantOutput(
      "This is a placeholder: The thread discusses new design mockups, a review after standup, and a request for feedback by noon."
    );
    // Trigger fade-in animation
    setSummaryVisible(false);
    requestAnimationFrame(() => setSummaryVisible(true));
  };

  const handleSmartReply = () => {
    setAssistantOutput(
      "This is a placeholder: Suggested reply — 'I’ll review the mockups after standup and share feedback before noon.'"
    );
    setSuggestionsVisible(true);
    // Scroll to bottom to reveal suggestions
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    });
  };

  return (
    <div className="flex h-full flex-col bg-[#0b0f19] text-[#e6e8ef] font-sans">
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-white/10 bg-[#0b0f19]/80 px-3 py-3 backdrop-blur">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-[#e6e8ef] transition hover:bg-white/10 active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          ← Back
        </button>
        <div className="text-base font-bold tracking-tight">{headerTitle}</div>
      </div>

      <div
        ref={scrollRef}
        className="no-scrollbar flex flex-1 flex-col gap-2 overflow-y-auto px-3 py-3 scroll-smooth"
      >
        {dummyThread.map((msg) => {
          const isOwn = msg.sender === "You";
          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${
                isOwn ? "justify-end" : "justify-start"
              }`}
            >
              {!isOwn && (
                <div
                  className="grid h-9 w-9 min-w-9 place-items-center rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 font-extrabold tracking-wide text-white"
                  aria-hidden
                >
                  {msg.sender
                    .split(" ")
                    .map((p) => p[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
              )}
              <div
                className={`max-w-[72%] rounded-[14px] border px-3 py-2 transition-all hover:scale-[1.01] ${
                  isOwn
                    ? "border-white/20 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white shadow-sm"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="mb-1 flex items-baseline justify-between gap-2">
                  <span className="text-[13px] font-bold text-gray-100">
                    {msg.sender}
                  </span>
                  <span className="text-[11px] text-white/60">{msg.time}</span>
                </div>
                <div className="text-sm leading-relaxed text-[#e6e8ef]">
                  {msg.text}
                </div>
              </div>
              {isOwn && <div className="w-9" />}
            </div>
          );
        })}
      </div>

      {/* Smart reply suggestions (shown on demand) */}
      {suggestionsVisible && (
        <div className="px-3 pb-2">
          <div className="flex flex-wrap gap-2">
            {[
              "Sure, I'll do it",
              "Let’s discuss in standup",
              "Sounds good",
            ].map((s) => (
              <button
                key={s}
                type="button"
                className="rounded-md bg-indigo-500 px-3 py-1 text-xs font-semibold text-white transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="sticky bottom-0 z-10 flex gap-2 border-t border-white/10 bg-[#0b0f19]/70 px-3 py-3 backdrop-blur">
        <button
          type="button"
          onClick={handleSummarize}
          className="flex-1 rounded-xl border border-white/20 bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-2 font-bold text-white shadow-sm transition-all hover:scale-[1.01] hover:shadow active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          ✨ Summarize Thread
        </button>
        <button
          type="button"
          onClick={handleSmartReply}
          className="flex-1 rounded-xl border border-white/20 bg-gradient-to-r from-fuchsia-500 to-amber-300 px-4 py-2 font-bold text-white shadow-sm transition-all hover:scale-[1.01] hover:shadow active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
        >
          💡 Smart Reply Suggestion
        </button>
      </div>

      {assistantOutput && (
        <div
          className={`m-3 rounded-xl border border-white/20 bg-indigo-600/10 p-3 transition-opacity duration-300 ${
            summaryVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="mb-1 text-[11px] font-bold uppercase tracking-wider text-white/70">
            AI Response (placeholder)
          </div>
          <div className="text-sm text-[#e6e8ef]">{assistantOutput}</div>
        </div>
      )}
    </div>
  );
};

ChatWindow.propTypes = {
  onBack: PropTypes.func,
  title: PropTypes.string,
};


export default ChatWindow;
