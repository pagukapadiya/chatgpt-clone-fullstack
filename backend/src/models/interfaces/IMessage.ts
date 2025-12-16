import { TableData } from "@/types";

export interface IMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  tableData?: TableData;
  feedback?: "like" | "dislike";
}

export interface IMessageMethods {
  setFeedback(feedback: "like" | "dislike"): void;
  toJSON(): Record<string, any>;
}

export type MessageModel = IMessage & IMessageMethods;
