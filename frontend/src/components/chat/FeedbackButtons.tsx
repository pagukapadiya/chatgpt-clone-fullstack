import React from "react";
import { Button } from "@/components/ui/Button";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface FeedbackButtonsProps {
  messageId: number;
  currentFeedback?: "like" | "dislike";
  onFeedback: (messageId: number, feedback: "like" | "dislike") => void;
  className?: string;
}

export const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({
  messageId,
  currentFeedback,
  onFeedback,
  className,
}) => {
  const handleLike = () => {
    onFeedback(messageId, "like");
  };

  const handleDislike = () => {
    onFeedback(messageId, "dislike");
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLike}
        className={`p-1 ${
          currentFeedback === "like"
            ? "text-green-600 bg-green-50 dark:bg-green-900/20"
            : "text-gray-500 hover:text-green-600"
        }`}
        aria-label="Like this response"
      >
        <ThumbsUp className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDislike}
        className={`p-1 ${
          currentFeedback === "dislike"
            ? "text-red-600 bg-red-50 dark:bg-red-900/20"
            : "text-gray-500 hover:text-red-600"
        }`}
        aria-label="Dislike this response"
      >
        <ThumbsDown className="w-4 h-4" />
      </Button>
    </div>
  );
};
