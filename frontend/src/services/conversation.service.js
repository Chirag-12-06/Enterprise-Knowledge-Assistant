import api from "./api";

export const getConversations = async () => {
  const response = await api.get("/conversations");
  return response.data;
};

export const createConversationService = async () => {
  const response = await api.post("/conversations");
  return response.data;
};

export const removeConversation = async (conversationId) => {
  await api.delete(`/conversations/${conversationId}`);
};
