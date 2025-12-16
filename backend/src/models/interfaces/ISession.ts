import { IMessage } from "./IMessage";

export interface ISession {
  id: string;
  title: string;
  createdAt: Date;
  lastActivity: Date;
  messages: IMessage[];
}

export interface ISessionMethods {
  addMessage(message: Omit<IMessage, "id" | "timestamp">): IMessage;
  updateMessageFeedback(
    messageId: number,
    feedback: "like" | "dislike"
  ): boolean;
  updateTitle(title: string): void;
  toJSON(): Record<string, any>;
  getFullHistory(): Record<string, any>;
}

export type SessionModel = ISession & ISessionMethods;
