// API Constants
export const API_PREFIX = process.env.API_PREFIX || "/api";
export const PORT = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

// Application Constants
export const MAX_MESSAGE_LENGTH = 1000;
export const MAX_SESSION_TITLE_LENGTH = 100;
export const DEFAULT_PAGE_LIMIT = 10;
export const MAX_PAGE_LIMIT = 50;
export const SESSION_ID_PREFIX = "session-";

// Error Messages
export const ERROR_MESSAGES = {
  SESSION_NOT_FOUND: "Session not found",
  MESSAGE_NOT_FOUND: "Message not found",
  INVALID_INPUT: "Invalid input provided",
  RATE_LIMITED: "Too many requests, please try again later",
  INTERNAL_ERROR: "Internal server error",
  VALIDATION_ERROR: "Validation failed",
  UNAUTHORIZED: "Unauthorized access",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  SESSION_CREATED: "Session created successfully",
  MESSAGE_SENT: "Message sent successfully",
  FEEDBACK_UPDATED: "Feedback updated successfully",
  SESSION_DELETED: "Session deleted successfully",
  TITLE_UPDATED: "Title updated successfully",
} as const;

// Response Status Codes
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;
