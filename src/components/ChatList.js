import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { dummyChats } from "../data/dummyData";

function getInitials(name) {
  const parts = name.split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getAvatarClass(name) {
  const palette = [
    "from-indigo-600 to-cyan-400",
    "from-fuchsia-500 to-rose-400",
    "from-emerald-500 to-teal-400",
    "from-amber-500 to-orange-400",
    "from-sky-500 to-blue-400",
    "from-purple-600 to-indigo-500",
  ];
  let sum = 0;
  for (let i = 0; i < name.length; i += 1)
    sum = (sum + name.charCodeAt(i)) % 997;
  const idx = sum % palette.length;
  return `bg-gradient-to-tr ${palette[idx]}`;
}

function getUnreadCount(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1)
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return hash % 7; // 0..6 unread
}

const ChatList = ({ onChatSelect, onNewChat }) => {
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

  const isEmpty = filtered.length === 0;

  return (
    <div className="flex h-full flex-col bg-white text-gray-900 font-sans dark:bg-stcBg dark:text-stcFg transition-colors">
      <div className="border-b border-black/10 px-4 pt-4 pb-2 dark:border-white/10">
        <div className="flex items-center justify-between gap-3">
          <div className="text-lg font-extrabold tracking-tight text-gray-900 dark:text-white/90">
            Chats
          </div>
          <button
            type="button"
            onClick={() => onNewChat && onNewChat()}
            className="hidden rounded-lg border border-black/10 px-3 py-1.5 text-xs font-semibold text-gray-900 transition-all hover:scale-[1.02] hover:bg-black/5 active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-white/10 dark:text-white dark:hover:bg-white/10 sm:inline"
          >
            + New
          </button>
        </div>
        <div className="mt-3">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search chats"
              className="w-full rounded-xl border border-black/15 bg-black/5 px-10 py-2.5 text-sm text-gray-900 placeholder-black/40 outline-none transition focus:border-black/25 focus:ring-2 focus:ring-indigo-500 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder-white/40"
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 dark:text-white/50">
              🔎
            </span>
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs text-gray-600 transition hover:bg-black/10 dark:text-white/60 dark:hover:bg-white/10"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto px-2 pt-2 no-scrollbar scroll-smooth">
        {!isEmpty &&
          filtered.map((chat) => {
            const unread = getUnreadCount(chat.name);
            return (
              <button
                key={chat.id}
                type="button"
                onClick={() => onChatSelect && onChatSelect(chat)}
                className="group flex w-full cursor-pointer items-center rounded-xl border border-black/10 bg-transparent p-3 text-left outline-none transition-all hover:scale-[1.01] hover:border-black/20 hover:bg-black/5 active:translate-y-px focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-white/10 dark:hover:border-white/20 dark:hover:bg-white/5"
              >
                <div
                  className={`grid h-10 w-10 min-w-10 place-items-center rounded-xl font-extrabold tracking-wide text-white ${getAvatarClass(
                    chat.name
                  )}`}
                  aria-hidden
                >
                  {getInitials(chat.name)}
                </div>
                <div className="ml-3 flex min-w-0 flex-1 flex-col">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-sm font-bold text-gray-900 dark:text-gray-100">
                      {chat.name}
                    </span>
                    <div className="flex items-center gap-2">
                      {unread > 0 && (
                        <span className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                          {unread}
                        </span>
                      )}
                      <span className="shrink-0 text-xs text-gray-500 dark:text-white/60">
                        {chat.time}
                      </span>
                    </div>
                  </div>
                  <div className="mt-1">
                    <span
                      className="block truncate text-xs text-gray-600 dark:text-white/80"
                      title={chat.lastMessage}
                    >
                      {chat.lastMessage}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}

        {isEmpty && (
          <div className="mx-2 my-6 rounded-2xl border border-black/10 bg-black/[0.03] p-8 text-center dark:border-white/10 dark:bg-white/5">
            <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 text-2xl text-white shadow">
              💬
            </div>
            <div className="text-base font-bold text-gray-900 dark:text-white">
              No chats found
            </div>
            <div className="mt-1 text-sm text-gray-600 dark:text-white/70">
              Try a different search, or start a new chat.
            </div>
            <button
              type="button"
              onClick={() => onNewChat && onNewChat()}
              className="mx-auto mt-4 inline-flex items-center rounded-xl border border-black/20 bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:scale-[1.02] hover:shadow active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-white/20"
            >
              + New Chat
            </button>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 mt-auto border-t border-black/10 bg-gradient-to-b from-transparent to-white/60 p-3 dark:border-white/10 dark:to-[#0b0f19]/60">
        <button
          type="button"
          onClick={() => onNewChat && onNewChat()}
          className="w-full rounded-xl border border-black/20 bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-3 font-bold text-white shadow-sm transition-all hover:scale-[1.01] hover:shadow active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-white/20"
        >
          + New Chat
        </button>
      </div>
    </div>
  );
};

ChatList.propTypes = {
  onChatSelect: PropTypes.func,
  onNewChat: PropTypes.func,
};


export default ChatList;
