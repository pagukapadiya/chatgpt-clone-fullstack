import { useChat as useChatContext } from "@/contexts/ChatContext";

export const useChat = () => {
  return useChatContext();
};
