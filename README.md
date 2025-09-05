# **Smart Team Chat**

**Smart Team Chat** is a clean, responsive team chat interface built with **React** and **Tailwind CSS**.  
It’s a frontend-only prototype designed to simulate a team messaging experience with multiple conversations, AI-inspired suggestions, and easy chat creation.  

---

## **Features**

- **Dynamic Chat Avatars** – Automatically generate gradient avatars with initials.  
- **Searchable Chat List** – Filter conversations by participant name or last message.  
- **Chat Window** – View messages in a scrollable interface with AI-inspired features:
  - Summarize Thread  
  - Smart Reply Suggestion  
- **New Chat** – Easily create new conversations and generate friendly icebreaker messages.  
- **Error Handling** – `ErrorBoundary` component ensures the app doesn’t crash if a component fails.  
- **Responsive Design** – Works on desktop and mobile screens.  

---

## **Components**

- **ChatList.jsx** – Displays all chats, shows participant initials, last message, and highlights the selected chat. Includes search functionality.  
- **ChatWindow.jsx** – Shows messages for a selected chat, allows typing messages, and provides AI actions (summary & suggested reply).  
- **NewChat.jsx** – Form to start a new chat and generate icebreaker messages.  
- **ErrorBoundary.jsx** – Wraps components to catch runtime errors and show a fallback UI instead of crashing the app.  

---

## **How It Works**

1. **Viewing Chats** – Open `ChatList` to see all conversations. Click a chat to open it in `ChatWindow`.  
2. **Messaging** – Type a message in `ChatWindow`. Messages are stored in dummy data, so they reset on refresh. Use AI actions to summarize or get suggested replies.  
3. **Creating a Chat** – Go to `NewChat`, enter a participant name, and optionally generate an icebreaker to start the conversation.  
4. **Error Handling** – Wrap components in `ErrorBoundary` to prevent the whole app from breaking if a component throws an error.  

---

## **Project Structure**

smart-team-chat/
│
├─ public/
│ └─ index.html # Main HTML file
│
├─ src/
│ ├─ components/
│ │ ├─ ChatList.jsx # Displays list of chats
│ │ ├─ ChatWindow.jsx # Displays chat messages and AI actions
│ │ ├─ NewChat.jsx # Form to create new chats
│ │ └─ ErrorBoundary.jsx # Catches runtime errors and shows fallback UI
│ │
│ ├─ data/
│ │ └─ dummyData.js # Sample chats, messages, and helper functions
│ │
│ ├─ App.jsx # Main app component
│ └─ index.js # Entry point
│
├─ package.json # Project dependencies and scripts
└─ tailwind.config.js # Tailwind CSS configuration

## **Data**
dummyData.js provides sample chats, messages, and utility functions:
findChatById(id) → Get a chat by its ID
addChat(name) → Add a new chat
Note: All data is in-memory and resets on page reload.
Future Improvements
Connect to a real backend for persistent messaging (Firebase, Node.js, etc.)
Implement real-time messaging via WebSockets
Add user authentication
Make AI suggestions dynamic using an API
Add dark mode and improved mobile responsiveness

##**Future Improvements**

Connect to a real backend for persistent messaging (Firebase, Node.js, etc.)
Implement real-time messaging via WebSockets
Add user authentication
Make AI suggestions dynamic using an API
Add dark mode and improved mobile responsiveness

## Getting Started

Follow these steps to run the Smart Team Chat project locally:

1. **Clone the repository:**

```bash
git clone <your-repo-url>
2. **Install dependencies:**
cd smart-team-chat
npm install
3. **Start the development server:**
npm start
4. **Open http://localhost:3000

