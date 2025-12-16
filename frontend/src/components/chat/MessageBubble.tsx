import React from "react";
import { format } from "date-fns";
import { Message } from "@/types";
import { DataTable } from "./DataTable";
import { FeedbackButtons } from "./FeedbackButtons";
import { User, Bot } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
  onFeedback: (messageId: number, feedback: "like" | "dislike") => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onFeedback,
}) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6`}>
      <div
        className={`flex max-w-[80%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser
              ? "ml-3 bg-primary-100 dark:bg-primary-900"
              : "mr-3 bg-gray-100 dark:bg-gray-800"
          }`}
        >
          {isUser ? (
            <User className="w-4 h-4 text-primary-600 dark:text-primary-400" />
          ) : (
            <Bot className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          )}
        </div>

        {/* Message Content */}
        <div
          className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
        >
          {/* Header */}
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {isUser ? "You" : "Assistant"}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {format(new Date(message.timestamp), "HH:mm")}
            </span>
          </div>

          {/* Bubble */}
          <div
            className={`rounded-2xl px-4 py-3 ${
              isUser
                ? "bg-primary-600 text-white rounded-br-none"
                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none"
            }`}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>

            {/* Table Data */}
            {message.tableData && (
              <div className="mt-3">
                <DataTable data={message.tableData} />
              </div>
            )}

            {/* Feedback for Assistant Messages */}
            {!isUser && (
              <div className="mt-3 flex justify-end">
                <FeedbackButtons
                  messageId={message.id}
                  currentFeedback={message.feedback}
                  onFeedback={onFeedback}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
