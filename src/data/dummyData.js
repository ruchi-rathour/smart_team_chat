export const dummyChats = [
  {
    id: "1",
    name: "Ananya Gupta",
    lastMessage: "Did you book the meeting room?",
    time: "10:42 AM",
    messages: [
      {
        sender: "them",
        text: "Morning! Did you get a chance to check the slides?",
        time: "10:35 AM",
      },
      {
        sender: "me",
        text: "Just opened them now. Looks detailed.",
        time: "10:36 AM",
      },
      {
        sender: "them",
        text: "Great, I added some notes on the second page.",
        time: "10:37 AM",
      },
      {
        sender: "me",
        text: "Noted. I’ll clean up the graphs before lunch.",
        time: "10:39 AM",
      },
      {
        sender: "them",
        text: "Perfect, that’ll save me some time.",
        time: "10:40 AM",
      },
      {
        sender: "me",
        text: "No worries. We should be ready for the review call.",
        time: "10:41 AM",
      },
    ],
  },
  {
    id: "2",
    name: "Product Team",
    lastMessage: "Final draft of the roadmap is ready.",
    time: "Yesterday",
    messages: [
      {
        sender: "them",
        text: "Roadmap draft is ready for review.",
        time: "3:05 PM",
      },
      { sender: "me", text: "Awesome. I’ll review today.", time: "3:07 PM" },
      { sender: "them", text: "Please focus on Q3 goals.", time: "3:10 PM" },
    ],
  },
  {
    id: "3",
    name: "Daily Standup",
    lastMessage: "Rohan is still fixing the login bug.",
    time: "Mon",
    messages: [
      { sender: "them", text: "Blocker: login bug persists.", time: "9:01 AM" },
      { sender: "me", text: "I can help pair after standup.", time: "9:03 AM" },
    ],
  },
  {
    id: "4",
    name: "Aditya Verma",
    lastMessage: "Let’s catch up over coffee later.",
    time: "Sun",
    messages: [
      { sender: "them", text: "Coffee later today?", time: "11:10 AM" },
      { sender: "me", text: "Yes! 4 PM works?", time: "11:12 AM" },
    ],
  },
  {
    id: "5",
    name: "HR Updates",
    lastMessage: "Holiday calendar has been shared.",
    time: "Sat",
    messages: [
      { sender: "them", text: "Holiday calendar is out.", time: "2:15 PM" },
      { sender: "me", text: "Thanks for the update!", time: "2:18 PM" },
    ],
  },
  {
    id: "6",
    name: "Meera Patel",
    lastMessage: "Pushed the fixes to GitHub.",
    time: "Fri",
    messages: [
      { sender: "them", text: "Fixes pushed to main.", time: "5:20 PM" },
      {
        sender: "me",
        text: "Great, I’ll deploy in the evening.",
        time: "5:22 PM",
      },
    ],
  },
  {
    id: "7",
    name: "Sales Team",
    lastMessage: "Client meeting confirmed for Tuesday.",
    time: "Thu",
    messages: [
      {
        sender: "them",
        text: "Client confirmed Tuesday 2 PM.",
        time: "4:05 PM",
      },
      { sender: "me", text: "Booked the room.", time: "4:08 PM" },
    ],
  },
  {
    id: "8",
    name: "Support Desk",
    lastMessage: "Issue #124 has been resolved.",
    time: "Wed",
    messages: [
      { sender: "them", text: "Issue #124 resolved.", time: "1:45 PM" },
      { sender: "me", text: "Closing the ticket now.", time: "1:47 PM" },
    ],
  },
];

export function findChatById(id) {
  return dummyChats.find((c) => c.id === id);
}

export function addChat(name) {
  const newId = String(
    Math.max(0, ...dummyChats.map((c) => parseInt(c.id, 10) || 0)) + 1
  );
  const newChat = {
    id: newId,
    name,
    lastMessage: "",
    time: "Now",
    messages: [],
  };
  dummyChats.unshift(newChat);
  return newChat;
}
