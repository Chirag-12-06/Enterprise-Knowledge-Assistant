import { useState } from "react";
import Header from "./layouts/Header";
import Sidebar from "./layouts/Sidebar";
import ChatLayout from "./layouts/ChatLayout";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // const [messages, setMessages] = useState([]);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "user",
      content: "What is the leave policy?",
    },
    {
      id: 2,
      role: "assistant",
      content: "Employees are entitled to 20 days of annual leave.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Backend call will come later
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex-1">
          <ChatLayout
            messages={messages}
            input={input}
            setInput={setInput}
            loading={loading}
            onSend={sendMessage}
          />
        </main>
      </div>
    </div>
  );
}
