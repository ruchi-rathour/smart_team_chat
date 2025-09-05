# Smart Team Chat

**Smart Team Chat** is a clean, responsive team chat interface built with React and Tailwind CSS.  
This frontend prototype simulates a modern messaging experience with multiple conversations, AI-inspired suggestions, and seamless chat creation.

---

## 📑 Table of Contents

- [✨ Features](#-features)  
- [⚙️ How It Works](#️-how-it-works)  
- [🗂️ Data](#️-data)  
- [🚀 Future Improvements](#-future-improvements)  
- [🛠️ Getting Started](#️-getting-started)  
- [📜 About & License](#-about--license)

---

## ✨ Features

- **Dynamic Chat Avatars** – Gradient avatars generated from participant initials.  
- **Searchable Chat List** – Quickly filter conversations by name or recent message.  
- **Chat Window** – Browse and send messages; includes AI-powered actions (thread summaries, smart replies).  
- **New Chat Creation** – Launch new chats with friendly icebreaker prompts.  
- **Error Handling** – Wrapped in an `ErrorBoundary` to prevent crashes.  
- **Responsive UI** – Works across desktop and mobile devices.

---

## ⚙️ How It Works

1. **Browse Chats**  
   - `ChatList.jsx` shows all conversations.  
   - Click a chat to open it in `ChatWindow.jsx`.

2. **Messaging**  
   - Messages are displayed in `ChatWindow.jsx`.  
   - Data is in-memory (resets on refresh).  
   - Use AI features: **thread summary** or **suggested replies**.

3. **Create a Chat**  
   - `NewChat.jsx` allows adding a new participant.  
   - Optionally generate an **icebreaker** message to start.

4. **Error Handling**  
   - Components are wrapped with `ErrorBoundary.jsx` for stability.

---

## 🗂️ Data

Dummy chat data lives in `dummyData.js` and includes helper utilities:

- `findChatById(id)` → Fetch chat by ID  
- `addChat(name)` → Create a new chat with the given participant name  

⚠️ **Note:** All data resets on reload (no database or backend yet).

---

## 🚀 Future Improvements

- Connect to a real backend (e.g., Firebase, Node.js, MongoDB)  
- Add real-time updates via WebSockets  
- Implement authentication and multi-user support  
- Make AI suggestions dynamic with an external API  
- Add **dark mode** and improve mobile UX  

---

## 🛠️ Getting Started

Clone the repository and run the project locally:

```bash
# Clone this repo
git clone https://github.com/ruchi-rathour/smart_team_chat.git
cd smart_team_chat

# Install dependencies
npm install

# Start development server
npm start

# Open in browser
http://localhost:3000


---
