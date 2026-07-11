import { useState } from "react";
import useChat from "./hooks/useChat";
import useConversations from "./hooks/useConversations";
import ChatLayout from "./layouts/ChatLayout";
import Header from "./layouts/Header";
import Sidebar from "./layouts/Sidebar";

export default function App() {
  const {
    conversations,
    activeConversationId,
    handleNewChat,
    handleConversationSelect,
    handleDeleteConversation,
    createConversation,
    fetchConversations,
  } = useConversations();

  const {
    input,
    setInput,
    loading,
    sendMessage,
    messages,
    loadMessages,
    newChat,
  } = useChat({
    activeConversationId,
    createConversation,
    fetchConversations,
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState(null);

  const onConversationSelect = async (id) => {
    handleConversationSelect(id);
    await loadMessages(id);
  };

  const onNewChat = () => {
    handleNewChat();
    newChat();
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={onConversationSelect}
        onNewChat={onNewChat}
        conversationToDelete={conversationToDelete}
        onDeleteConversation={handleDeleteConversation}
        setConversationToDelete={setConversationToDelete}
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
