export interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  tableData?: TableData;
  feedback?: "like" | "dislike";
}

export interface TableData {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface Session {
  id: string;
  title: string;
  createdAt: Date;
  lastActivity: Date;
  messageCount: number;
  messages?: Message[];
}

export interface ChatResponse {
  success: boolean;
  data?:
    | {
        sessionId: string;
        title: string;
        createdAt: Date;
      }
    | Message;
  error?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface FeedbackPayload {
  feedback: "like" | "dislike";
}

export interface QuestionPayload {
  question: string;
}
