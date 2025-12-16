import React from "react";
import { clsx } from "clsx";
import { formatDistanceToNow } from "date-fns";
import { Session } from "@/types";
import { Button } from "@/components/ui/Button";
import { MessageSquare, Trash2, Clock, ChevronRight } from "lucide-react";

interface SessionItemProps {
  session: Session;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: () => void;
  onDelete: (e: React.MouseEvent) => void;
}

export const SessionItem: React.FC<SessionItemProps> = ({
  session,
  isActive,
  isCollapsed,
  onClick,
  onDelete,
}) => {
  const formattedTime = formatDistanceToNow(new Date(session.lastActivity), {
    addSuffix: true,
  });

  // Generate initials from title
  const getInitials = (title: string) => {
    return title
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Truncate title for display
  const truncateTitle = (title: string, maxLength: number = 20) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + "...";
  };

  return (
    <div
      onClick={onClick}
      className={clsx(
        "group relative flex items-center rounded-lg p-3 cursor-pointer transition-all hover:scale-[1.02]",
        "border border-transparent hover:border-gray-200 dark:hover:border-gray-700",
        isActive
          ? "bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800"
          : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50"
      )}
      title={session.title}
      aria-label={`Chat session: ${session.title}`}
    >
      {/* Session Icon/Initials */}
      <div
        className={clsx(
          "flex-shrink-0 rounded-lg flex items-center justify-center",
          "transition-colors",
          isActive
            ? "bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300"
            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
        )}
        style={{ width: isCollapsed ? 40 : 48, height: isCollapsed ? 40 : 48 }}
      >
        {isCollapsed ? (
          <MessageSquare className="w-4 h-4" />
        ) : (
          <span className="font-semibold text-sm">
            {getInitials(session.title)}
          </span>
        )}
      </div>

      {!isCollapsed && (
        <>
          {/* Session Info */}
          <div className="ml-3 flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3
                className={clsx(
                  "text-sm font-medium truncate",
                  isActive
                    ? "text-primary-900 dark:text-primary-200"
                    : "text-gray-900 dark:text-white"
                )}
              >
                {truncateTitle(session.title)}
              </h3>
              <span
                className={clsx(
                  "text-xs px-1.5 py-0.5 rounded",
                  isActive
                    ? "bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                )}
              >
                {session.messageCount}
              </span>
            </div>

            <div className="flex items-center mt-1">
              <Clock className="w-3 h-3 mr-1 text-gray-400 dark:text-gray-500" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formattedTime}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="ml-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400"
              aria-label="Delete session"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
            <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          </div>
        </>
      )}

      {/* Active indicator */}
      {isActive && (
        <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-primary-600 dark:bg-primary-400 rounded-full" />
      )}

      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
          <div className="font-medium">{session.title}</div>
          <div className="text-gray-300">{session.messageCount} messages</div>
        </div>
      )}
    </div>
  );
};
