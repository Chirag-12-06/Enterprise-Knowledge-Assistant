import EmptyState from "../components/chat/EmptyState";
import InputBox from "../components/chat/InputBox";
import Conversation from "../components/chat/Conversation";

const ChatWindow = ({ messages, input, setInput, onSend, loading }) => {
  return (
    <main className="flex h-full w-full flex-col bg-slate-50">
      <section className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <Conversation messages={messages} loading={loading} />
        )}
      </section>

      <InputBox
        input={input}
        setInput={setInput}
        onSend={onSend}
        loading={loading}
      />
    </main>
  );
};

export default ChatWindow;
