import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Session, Message } from "@/types";
import { apiService } from "@/services/api";
import { ROUTES } from "@/utils/constants";

interface ChatContextType {
  currentSession: Session | null;
  sessions: Session[];
  messages: Message[];
  isLoading: boolean;
  isSending: boolean;
  error: string | null;
  startNewChat: () => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  updateFeedback: (
    messageId: number,
    feedback: "like" | "dislike"
  ) => Promise<void>;
  loadSession: (sessionId: string) => Promise<void>;
  refreshSessions: () => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
  clearError: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const clearError = () => setError(null);

  const loadSessions = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getAllSessions();
      if (response.success && response.data) {
        setSessions(response.data);
      } else {
        setError(response.error || "Failed to load sessions");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadSession = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);
        const response = await apiService.getSessionDetails(id);
        if (response.success && response.data) {
          setCurrentSession(response.data);
          setMessages(response.data.messages || []);
          navigate(`/chat/${id}`);
        } else {
          setError(response.error || "Session not found");
          navigate(ROUTES.HOME);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to load session");
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  useEffect(() => {
    if (sessionId) {
      loadSession(sessionId);
    }
  }, [sessionId, loadSession]);

  const startNewChat = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.startNewChat();
      if (response.success && response.data) {
        const { sessionId } = response.data;
        await loadSession(sessionId);
        await loadSessions();
      } else {
        setError(response.error || "Failed to start new chat");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to create new chat session");
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (content: string) => {
    if (!currentSession || !content.trim()) return;

    try {
      setIsSending(true);
      const userMessage: Message = {
        id: messages.length + 1,
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);

      const response = await apiService.sendMessage(currentSession.id, content);
      if (response.success && response.data) {
        setMessages((prev) => [...prev, response.data!]);
        await loadSessions();
      } else {
        setError(response.error || "Failed to get response");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const updateFeedback = async (
    messageId: number,
    feedback: "like" | "dislike"
  ) => {
    if (!currentSession) return;

    try {
      const response = await apiService.updateFeedback(
        currentSession.id,
        messageId,
        feedback
      );
      if (response.success) {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === messageId ? { ...msg, feedback } : msg))
        );
      }
    } catch (err) {
      console.error("Failed to update feedback:", err);
    }
  };

  const deleteSession = async (sessionId: string) => {
    try {
      const response = await apiService.deleteSession(sessionId);
      if (response.success) {
        await loadSessions();
        if (currentSession?.id === sessionId) {
          setCurrentSession(null);
          setMessages([]);
          navigate(ROUTES.HOME);
        }
      } else {
        setError(response.error || "Failed to delete session");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to delete session");
    }
  };

  const refreshSessions = loadSessions;

  return (
    <ChatContext.Provider
      value={{
        currentSession,
        sessions,
        messages,
        isLoading,
        isSending,
        error,
        startNewChat,
        sendMessage,
        updateFeedback,
        loadSession,
        refreshSessions,
        deleteSession,
        clearError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
