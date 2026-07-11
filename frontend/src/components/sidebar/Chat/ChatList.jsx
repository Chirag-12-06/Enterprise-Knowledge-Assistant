import ChatItem from "./ChatItem";
import EmptyConversation from "../Empty/EmptyConversation";

export default function ChatList({
  conversations,
  activeConversationId,
  onSelectConversation,
  onDelete,
}) {
  if (conversations.length === 0) {
    return <EmptyConversation />;
  }

  return (
    <div className="space-y-1">
      {conversations.map((conversation) => (
        <ChatItem
          key={conversation._id}
          conversation={conversation}
          active={conversation._id === activeConversationId}
          onClick={() => onSelectConversation(conversation._id)}
          onDelete={() => {
            onDelete(conversation);
          }}
        />
      ))}
    </div>
  );
}
