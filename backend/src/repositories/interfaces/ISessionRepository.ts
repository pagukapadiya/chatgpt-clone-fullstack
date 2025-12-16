import { Session } from "@/models/Session";
import { Message } from "@/models/Message";
import { TableData } from "@/types";

export interface ISessionRepository {
  // Session operations
  createSession(title?: string): Session;
  getSessionById(sessionId: string): Session | undefined;
  getAllSessions(): Session[];
  deleteSession(sessionId: string): boolean;
  updateSessionTitle(sessionId: string, title: string): boolean;

  // Message operations
  addMessage(
    sessionId: string,
    message: Omit<Message, "id" | "timestamp">
  ): Message | undefined;
  updateMessageFeedback(
    sessionId: string,
    messageId: number,
    feedback: "like" | "dislike"
  ): boolean;

  // Data generation
  generateMockTableData(type?: string): TableData;
}
