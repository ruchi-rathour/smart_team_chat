import React, { useState, useCallback } from "react";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import NewChat from "./components/NewChat";
import { dummyChats } from "./data/dummyData";

const App = () => {
  const [screen, setScreen] = useState("chatList");
  const [selectedChat, setSelectedChat] = useState(null);

  const openChat = useCallback((chat) => {
    setSelectedChat(chat);
    setScreen("chatWindow");
  }, []);

  const openNewChat = useCallback(() => {
    setScreen("newChat");
  }, []);

  const goBackToList = useCallback(() => {
    setScreen("chatList");
  }, []);

  const handleStartChat = useCallback((name) => {
    // UI-only flow: set a new selected chat using the provided name
    setSelectedChat({ id: "temp", name, lastMessage: "", time: "Now" });
    setScreen("chatWindow");
  }, []);

  return (
    <div
      className={`h-screen w-screen font-sans ${"dark"}`}
      style={{
        backgroundImage: "url('/back_image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="mx-auto flex h-full max-w-6xl flex-col px-4 py-4 bg-white/90 text-gray-900 dark:bg-stcBg/90 dark:text-stcFg transition-colors backdrop-blur-sm">
        <header className="mb-4 flex items-center justify-between">
          <h1 className="text-lg font-extrabold tracking-tight text-gray-900 dark:text-white/90">
            Smart Team Chat
          </h1>
          <div className="flex items-center gap-3">
            <div className="text-xs text-gray-600 dark:text-white/50">
              UI Preview • Dummy Data
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 overflow-hidden rounded-2xl border border-black/10 bg-black/[0.03] shadow-[inset_0_1px_0_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-white/5 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors">
          {screen === "chatList" && (
            <div className="h-full">
              <ChatList
                onChatSelect={(chat) => openChat(chat)}
                onNewChat={openNewChat}
              />
            </div>
          )}

          {screen === "chatWindow" && (
            <div className="h-full">
              <ChatWindow
                title={selectedChat?.name || "Conversation"}
                onBack={goBackToList}
              />
            </div>
          )}

          {screen === "newChat" && (
            <div className="h-full">
              <NewChat onBack={goBackToList} onStart={handleStartChat} />
            </div>
          )}
        </main>

        {screen === "chatList" && (
          <footer className="mt-4 flex items-center justify-between text-xs text-gray-600 dark:text-white/50">
            <div>{dummyChats.length} chats</div>
            <button
              type="button"
              onClick={openNewChat}
              className="rounded-lg border border-black/10 px-3 py-1.5 font-semibold text-gray-900 transition-all hover:bg-black/5 hover:scale-[1.02] active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-white/10 dark:text-[#e6e8ef] dark:hover:bg-white/10"
            >
              + New Chat
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);
  const handleToggle = () => {
    setIsDark((prev) => !prev);
    const root = document.documentElement;
    if (!root) return;
    if (!isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };
  return (
    <button
      type="button"
      onClick={handleToggle}
      className="rounded-lg border border-black/10 px-3 py-1.5 text-xs font-semibold text-gray-900 transition-all hover:bg-black/5 hover:scale-[1.02] active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
      aria-label="Toggle dark mode"
      title="Toggle theme"
    >
      <span className="hidden dark:inline">Light</span>
      <span className="inline dark:hidden">Dark</span>
    </button>
  );
};

export default App;
