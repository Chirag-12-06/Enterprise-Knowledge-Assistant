import { useEffect, useState } from "react";
import api from "../services/api";
import useConversations from "./useConversations";
import { sendMessageService } from "../services/chat.service";
import { getMessages } from "../services/message.service";
import { toast } from "sonner";

export default function useChat({
  activeConversationId,
  createConversation,
  fetchConversations,
}) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const loadMessages = async (conversationId) => {
    const data = await getMessages(conversationId);
    setMessages(data);
  };

  const newChat = () => {
    setMessages([]);
    setInput("");
  };

  const sendMessage = async () => {
    
    const question = input.trim();
    if (!question) return;

    let id = activeConversationId;

    if (!id) {
      const conversation = await createConversation();
      id = conversation._id;
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
      const response = await sendMessageService(id, question);
      await fetchConversations();
      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: response.answer,
        sources: response.sources,
        retrievedChunks: response.retrievedChunks,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate response");
    } finally {
      setLoading(false);
    }
  };
  return {
    sendMessage,
    input,
    setInput,
    loading,
    messages,
    loadMessages,
    newChat,
  };
}
