import Message from "./Message";

const Conversation = ({ messages }) => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default Conversation;