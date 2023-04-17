import api from './_baseApi';

export const getChatFn = async ({ queryKey }) => {
  const [, chatId] = queryKey;
  const response = await api.get(`chat-messages/${chatId}`);
  return response.data;
};

export const deleteChatMessageFn = async (id: string) => {
  const response = await api.delete(`chat-messages/${id}`);
  return response.data;
};
