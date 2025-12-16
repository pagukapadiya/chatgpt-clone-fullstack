import { MessageModel } from "./interfaces/IMessage";
import { TableData } from "@/types";

/**
 * Message Model
 * Represents a single chat message with user/assistant role
 */
export class Message implements MessageModel {
  public id: number;
  public role: "user" | "assistant";
  public content: string;
  public timestamp: Date;
  public tableData?: TableData;
  public feedback?: "like" | "dislike";

  constructor(
    id: number,
    role: "user" | "assistant",
    content: string,
    tableData?: TableData
  ) {
    this.id = id;
    this.role = role;
    this.content = content;
    this.timestamp = new Date();
    this.tableData = tableData;
  }

  /**
   * Set feedback for the message
   * @param feedback - 'like' or 'dislike'
   */
  public setFeedback(feedback: "like" | "dislike"): void {
    this.feedback = feedback;
  }

  /**
   * Convert message to plain object
   */
  public toJSON(): Record<string, any> {
    return {
      id: this.id,
      role: this.role,
      content: this.content,
      timestamp: this.timestamp,
      tableData: this.tableData,
      feedback: this.feedback,
    };
  }

  /**
   * Create a new message instance
   */
  public static create(
    id: number,
    role: "user" | "assistant",
    content: string,
    tableData?: TableData
  ): Message {
    return new Message(id, role, content, tableData);
  }

  /**
   * Create a user message
   */
  public static createUserMessage(id: number, content: string): Message {
    return new Message(id, "user", content);
  }

  /**
   * Create an assistant message
   */
  public static createAssistantMessage(
    id: number,
    content: string,
    tableData?: TableData
  ): Message {
    return new Message(id, "assistant", content, tableData);
  }
}
