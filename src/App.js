import React, { useMemo, useState } from "react";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import NewChat from "./components/NewChat";
import { findChatById } from "./data/dummyData";
import ErrorBoundary from "./components/ErrorBoundary"; 

const App = () => {
  const [selectedChatId, setSelectedChatId] = useState("");
  const [showNewChat, setShowNewChat] = useState(false);

  const selectedChat = useMemo(
    () => (selectedChatId ? findChatById(selectedChatId) : null),
    [selectedChatId]
  );

  return (
    <div className="flex h-screen w-screen font-sans bg-white text-gray-900">
      {/* Left Column */}
      <div className="w-1/3 border-r overflow-y-auto">
        <ErrorBoundary>
          <ChatList
            selectedId={selectedChatId}
            onSelectChat={(id) => {
              setShowNewChat(false);
              setSelectedChatId(id);
            }}
            onNewChat={() => {
              setSelectedChatId("");
              setShowNewChat(true);
            }}
          />
        </ErrorBoundary>
      </div>

      {/* Right Column */}
      <div className="flex-1 flex flex-col">
        <ErrorBoundary>
          {!selectedChat && !showNewChat && (
            <div className="h-full grid place-items-center text-gray-500">
              Select a chat to start messaging
            </div>
          )}

          {selectedChat && !showNewChat && (
            <ChatWindow chatId={selectedChatId} />
          )}

          {showNewChat && (
            <NewChat onChatCreated={(id) => setSelectedChatId(id)} />
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default App;
