import React, { useMemo, useState } from "react";
import { dummyChats } from "../data/dummyData";

function getStartname(name) {
  const parts = name.split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getAvatarphoto(name) {
  // A few nice gradient combos for avatars
  const gradients = [
    "from-indigo-600 to-cyan-400",
    "from-fuchsia-500 to-rose-400",
    "from-emerald-500 to-teal-400",
    "from-amber-500 to-orange-400",
    "from-sky-500 to-blue-400",
    "from-purple-600 to-indigo-500",
    "from-pink-600 to-orange-400",
    "from-teal-500 to-lime-400",
    "from-red-500 to-yellow-400",
    "from-blue-600 to-violet-400",
    "from-gray-600 to-gray-400",
    "from-green-700 to-emerald-400",
  ];

  // Simple hash based on name so each person gets a consistent color
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash + name.charCodeAt(i)) % 1000;
  }

  const colorIndex = hash % gradients.length;
  return `bg-gradient-to-tr ${gradients[colorIndex]}`;
}



const ChatList = ({ selectedId, onSelectChat, onNewChat }) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return dummyChats;
    return dummyChats.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.lastMessage.toLowerCase().includes(q)
    );
  }, [query]);

  //const isEmpty = filtered.length === 0;

  return (
    <div className="h-full w-full flex flex-col bg-white relative">
      <div className="bg-gradient-to-r from-green-500 to-indigo-500 text-white p-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full grid place-items-center bg-white/20 text-white font-bold">
            ST
          </div>
          <div className="text-base font-semibold">Smart Team Chat</div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="p-2 rounded-full hover:bg-white/10"
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <circle cx="11" cy="11" r="7" strokeWidth="2" />
              <path d="M20 20l-3.5-3.5" strokeWidth="2" />
            </svg>
          </button>
          <button
            type="button"
            className="p-2 rounded-full hover:bg-white/10"
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-3 border-b">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="w-full border rounded-xl px-3 py-2 text-sm"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.map((chat) => (
          <button
            key={chat.id}
            type="button"
            onClick={() => onSelectChat && onSelectChat(chat.id)}
            className={`w-full flex items-center gap-3 p-3 border-b hover:bg-gray-50 ${
              selectedId === chat.id ? "bg-gray-100" : ""
            }`}
          >
            <div
              className={`h-10 w-10 rounded-full grid place-items-center text-white font-bold ${getAvatarphoto(
                chat.name
              )}`}
            >
              {getStartname(chat.name)}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between">
                <div className="font-semibold truncate">{chat.name}</div>
                <div className="text-xs text-gray-500">{chat.time}</div>
              </div>
              <div className="text-xs text-gray-600 truncate">
                {chat.lastMessage}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="absolute bottom-4 right-4">
        <button
          type="button"
          onClick={() => onNewChat && onNewChat()}
          className="text-white bg-emerald-600  rounded-full p-4 shadow-lg"
          aria-label="New Chat"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ChatList;
