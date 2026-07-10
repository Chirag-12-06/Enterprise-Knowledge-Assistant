import { useState } from "react";
import Header from "./layouts/Header";
import Sidebar from "./layouts/Sidebar";
import ChatLayout from "./layouts/ChatLayout";
import api from "./services/api";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);

  const createConversation = async () => {
    const response = await api.post("/conversations");

    setConversationId(response.data._id);

    return response.data._id;
  };

  const sendMessage = async () => {
    const question = input.trim();
    if (!question) return;

    let id = conversationId;

    if (!id) {
      id = await createConversation();
    }

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setLoading(true);

    try {
      const response = await api.post(`/chat/${id}`, {
        question,
      });

      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: response.data.answer,
        sources: response.data.sources,
        retrievedChunks: response.data.retrievedChunks,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex flex-1 overflow-hidden">
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
