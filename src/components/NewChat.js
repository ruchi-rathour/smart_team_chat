import React, { useState } from "react";
import PropTypes from "prop-types";

const NewChat = ({ onBack, onStart }) => {
  const [participant, setParticipant] = useState("");
  const [icebreaker, setIcebreaker] = useState("");
  const [toast, setToast] = useState("");

  const handleStart = () => {
    if (onStart) onStart(participant.trim());
  };

  const handleIcebreaker = () => {
    setIcebreaker(
      "Placeholder AI: Here's a friendly opener — 'Hey there! How has your week been so far?'"
    );
    setToast("Hey 👋 Excited to kick off this chat!");
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <div className="flex h-full w-full flex-col bg-white text-gray-900 font-sans dark:bg-stcBg dark:text-stcFg transition-colors">
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-black/10 bg-white/80 px-4 py-3 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#0b0f19]/80">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center rounded-lg border border-black/10 px-3 py-2 text-sm font-semibold text-gray-900 transition-all hover:scale-[1.02] active:translate-y-px hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-white/10 dark:text-[#e6e8ef] dark:hover:bg-white/10"
        >
          ← Back
        </button>
        <div className="text-base font-bold tracking-tight">
          Start a New Chat
        </div>
      </div>

      <div className="mx-auto w-full max-w-md flex-1 overflow-y-auto sm:px-2 md:px-4 px-4 py-6">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="participant"
              className="mb-2 block text-sm font-semibold text-white/80"
            >
              Participant Name
            </label>
            <input
              id="participant"
              type="text"
              value={participant}
              onChange={(e) => setParticipant(e.target.value)}
              placeholder="e.g., Alice Johnson"
              className="w-full rounded-xl border border-black/15 bg-black/5 px-4 py-3 text-[15px] text-gray-900 placeholder-black/40 outline-none transition focus:border-black/25 focus:ring-2 focus:ring-indigo-500 dark:border-white/15 dark:bg-white/5 dark:text-[#e6e8ef] dark:placeholder-white/40"
            />
            <p className="mt-2 text-xs text-gray-600 dark:text-white/50">
              Enter who you want to chat with.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleStart}
              className="flex-1 rounded-xl border border-black/20 bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-3 text-sm font-bold text-white shadow-sm transition-all hover:scale-[1.02] hover:shadow active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-white/20"
            >
              Start Chat
            </button>
            <button
              type="button"
              onClick={handleIcebreaker}
              className="flex-1 rounded-xl border border-black/20 bg-gradient-to-r from-fuchsia-500 to-amber-300 px-4 py-3 text-sm font-bold text-white shadow-sm transition-all hover:scale-[1.02] hover:shadow active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 dark:border-white/20"
            >
              Generate Icebreaker
            </button>
          </div>

          {icebreaker && (
            <div className="rounded-xl border border-black/15 bg-black/5 p-4 dark:border-white/15 dark:bg-white/5">
              <div className="mb-1 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-white/60">
                AI Suggestion (placeholder)
              </div>
              <div className="text-sm leading-relaxed text-gray-800 dark:text-[#e6e8ef]">
                {icebreaker}
              </div>
            </div>
          )}
          {toast && (
            <div className="fixed bottom-4 right-4 rounded-lg bg-gray-800 p-3 text-sm text-white shadow-lg transition-transform duration-200 ease-out">
              {toast}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

NewChat.propTypes = {
  onBack: PropTypes.func,
  onStart: PropTypes.func,
};

export default NewChat;
