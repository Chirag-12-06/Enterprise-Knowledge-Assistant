import Message from "./Message";
import { useEffect, useRef } from "react";

const Conversation = ({ messages, loading }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      {loading && (
        <Message
          message={{
            role: "assistant",
            content: "Thinking...",
          }}
        />
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default Conversation;
