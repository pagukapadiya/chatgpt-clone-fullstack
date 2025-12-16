import { SessionModel } from "./interfaces/ISession";
import { IMessage } from "./interfaces/IMessage";
import { Message } from "./Message";

/**
 * Session Model
 * Represents a chat session with its properties and methods
 */
export class Session implements SessionModel {
  public id: string;
  public title: string;
  public createdAt: Date;
  public lastActivity: Date;
  public messages: Message[];

  constructor(id: string, title: string = "New Chat") {
    this.id = id;
    this.title = title;
    this.createdAt = new Date();
    this.lastActivity = new Date();
    this.messages = [];
  }

  /**
   * Add a message to the session
   * @param message - Message data without id and timestamp
   * @returns The created message
   */
  public addMessage(message: Omit<IMessage, "id" | "timestamp">): Message {
    const newMessage = Message.create(
      this.messages.length + 1,
      message.role,
      message.content,
      message.tableData
    );

    this.messages.push(newMessage);
    this.lastActivity = new Date();

    // Auto-generate title from first user message if still default
    if (this.title === "New Chat" && message.role === "user") {
      this.updateTitle(
        message.content.substring(0, 50) +
          (message.content.length > 50 ? "..." : "")
      );
    }

    return newMessage;
  }

  /**
   * Update feedback for a specific message
   * @param messageId - ID of the message to update
   * @param feedback - 'like' or 'dislike'
   * @returns True if message was found and updated
   */
  public updateMessageFeedback(
    messageId: number,
    feedback: "like" | "dislike"
  ): boolean {
    const message = this.messages.find((m) => m.id === messageId);
    if (message) {
      message.setFeedback(feedback);
      return true;
    }
    return false;
  }

  /**
   * Update session title
   * @param title - New title for the session
   */
  public updateTitle(title: string): void {
    this.title = title;
    this.lastActivity = new Date();
  }

  /**
   * Get session summary (without full messages)
   */
  public toJSON(): Record<string, any> {
    return {
      id: this.id,
      title: this.title,
      createdAt: this.createdAt,
      lastActivity: this.lastActivity,
      messageCount: this.messages.length,
      lastMessage:
        this.messages.length > 0
          ? this.messages[this.messages.length - 1].toJSON()
          : null,
    };
  }

  /**
   * Get complete session with all messages
   */
  public getFullHistory(): Record<string, any> {
    return {
      ...this.toJSON(),
      messages: this.messages.map((msg) => msg.toJSON()),
    };
  }

  /**
   * Create a new session instance
   */
  public static create(id: string, title?: string): Session {
    return new Session(id, title);
  }
}
