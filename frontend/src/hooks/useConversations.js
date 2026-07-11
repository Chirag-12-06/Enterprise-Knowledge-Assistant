import { useEffect, useState } from "react";
import {
  createConversationService,
  getConversations,
  removeConversation,
} from "../services/conversation.service";
import { toast } from "sonner";

export default function useConversations() {
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);

  const fetchConversations = async () => {
    try {
      const data = await getConversations();
      setConversations(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const createConversation = async () => {
    const conversation = await createConversationService();

    setActiveConversationId(conversation._id);

    await fetchConversations();

    return conversation;
  };

  const handleNewChat = () => {
    setActiveConversationId(null);
  };

  const handleConversationSelect = async (conversationId) => {
      setActiveConversationId(conversationId);
  };

  const handleDeleteConversation = async (conversationId) => {
    try {
      await removeConversation(conversationId);
toast.success("Conversation deleted");
      await fetchConversations();

      if (conversationId === activeConversationId) {
        setActiveConversationId(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete conversation");
    }
  };

  return {
    conversations,
    activeConversationId,
    handleNewChat,
    handleConversationSelect,
    handleDeleteConversation,
    createConversation,
    setActiveConversationId,
    fetchConversations,
  };
}
