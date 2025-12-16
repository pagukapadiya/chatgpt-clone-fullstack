import { TableData, User } from "@/types";

export const API_BASE_URL = "http://localhost:5000/api";

export const ROUTES = {
  HOME: "/",
  CHAT: "/chat",
  CHAT_SESSION: "/chat/:sessionId",
} as const;

export const STORAGE_KEYS = {
  THEME: "chat-app-theme",
  USER_INFO: "chat-app-user",
} as const;

export const DEFAULT_USER: User = {
  id: "user-001",
  name: "Guest User",
  email: "guest@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=guest",
};

export const MOCK_TABLE_DATA: TableData[] = [
  {
    headers: ["Product", "Q1 Sales", "Q2 Sales", "Growth"],
    rows: [
      ["Laptop Pro", "$1.2M", "$1.5M", "+25%"],
      ["Phone X", "$2.1M", "$2.4M", "+14%"],
      ["Tablet Air", "$800K", "$950K", "+19%"],
    ],
    caption: "Sales Performance Q1 vs Q2 2024",
  },
  {
    headers: ["Region", "Users", "Growth", "Engagement"],
    rows: [
      ["North America", "45K", "+12%", "High"],
      ["Europe", "38K", "+8%", "Medium"],
      ["Asia", "52K", "+18%", "High"],
    ],
    caption: "User Metrics by Region",
  },
];
