// Common Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Message Types
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
  summary?: string;
}

export interface CreateMessageDTO {
  role: "user" | "assistant";
  content: string;
  tableData?: TableData;
}

// Session Types
export interface Session {
  id: string;
  title: string;
  createdAt: Date;
  lastActivity: Date;
  messageCount: number;
  messages?: Message[];
}

export interface CreateSessionDTO {
  title?: string;
  initialMessage?: string;
}

export interface UpdateSessionDTO {
  title?: string;
}

// Request/Response Types
export interface StartChatResponse {
  sessionId: string;
  title: string;
  createdAt: Date;
}

export interface SendMessageRequest {
  question: string;
}

export interface SendMessageResponse extends Message {}

export interface UpdateFeedbackRequest {
  feedback: "like" | "dislike";
}

// Error Types
export interface AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  code?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}
