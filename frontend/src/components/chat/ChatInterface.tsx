import React, { useEffect, useRef } from "react";
import { useChat } from "@/hooks/useChat";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { EmptyState } from "@/components/ui/EmptyState";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Bot } from "lucide-react";

export const ChatInterface: React.FC = () => {
  const {
    messages,
    isSending,
    error,
    sendMessage,
    updateFeedback,
    clearError,
  } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    await sendMessage(content);
  };

  const handleFeedback = async (
    messageId: number,
    feedback: "like" | "dislike"
  ) => {
    await updateFeedback(messageId, feedback);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Something went wrong
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
          {error}
        </p>
        <Button
          variant="primary"
          onClick={clearError}
          icon={<RefreshCw className="w-4 h-4" />}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {messages.length === 0 ? (
          <EmptyState
            title="Start a conversation"
            description="Type a message below to begin chatting with the AI assistant."
            icon="message"
          />
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble
                key={`${message.id}-${message.timestamp}`}
                message={message}
                onFeedback={handleFeedback}
              />
            ))}
            {isSending && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-4 md:p-6">
        <ChatInput onSendMessage={handleSendMessage} disabled={isSending} />
        <div className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
          AI-generated responses may be inaccurate. Please verify critical
          information.
        </div>
      </div>
    </div>
  );
};
