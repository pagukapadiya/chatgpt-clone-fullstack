import { TableData } from "@/types";

/**
 * Generate a random ID
 */
export const generateId = (prefix: string = "id"): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format date to readable string
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

/**
 * Generate mock table data
 */
export const generateTableData = (): TableData => {
  const tableTypes = ["sales", "users", "financial", "performance"];
  const randomType = tableTypes[Math.floor(Math.random() * tableTypes.length)];

  switch (randomType) {
    case "sales":
      return {
        headers: ["Product", "Q1", "Q2", "Growth"],
        rows: [
          ["Product A", "$100K", "$120K", "+20%"],
          ["Product B", "$80K", "$95K", "+19%"],
          ["Product C", "$60K", "$70K", "+17%"],
        ],
        caption: "Sales Performance",
        summary: "Overall growth of 18.7% across all products",
      };
    case "users":
      return {
        headers: ["Region", "Active", "New", "Retention"],
        rows: [
          ["North America", "45K", "3.4K", "92%"],
          ["Europe", "38K", "2.9K", "91%"],
          ["Asia", "52K", "4.1K", "89%"],
        ],
        caption: "User Statistics",
        summary: "Total active users: 135,000",
      };
    default:
      return {
        headers: ["Metric", "Current", "Target", "Status"],
        rows: [
          ["Metric 1", "85%", "90%", "On Track"],
          ["Metric 2", "92%", "95%", "On Track"],
          ["Metric 3", "78%", "85%", "Needs Attention"],
        ],
        caption: "Performance Metrics",
        summary: "2 out of 3 metrics are on track",
      };
  }
};

/**
 * Sleep/delay function
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Validate UUID format
 */
export const isValidUuid = (uuid: string): boolean => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

/**
 * Sanitize user input
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, "") // Remove HTML tags
    .trim()
    .slice(0, 1000); // Limit length
};
