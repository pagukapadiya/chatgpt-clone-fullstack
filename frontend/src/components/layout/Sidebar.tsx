import React, { useState } from "react";
import { clsx } from "clsx";
import { useChat } from "@/hooks/useChat";
import { useResponsive } from "@/hooks/useResponsive";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { MessageSquare, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { SessionItem } from "../ui/SessionItem";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const {
    sessions,
    currentSession,
    isLoading,
    startNewChat,
    loadSession,
    deleteSession,
  } = useChat();
  const { isMobile } = useResponsive();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleNewChat = async () => {
    await startNewChat();
    if (isMobile) onClose();
  };

  const handleSessionClick = async (sessionId: string) => {
    await loadSession(sessionId);
    if (isMobile) onClose();
  };

  const handleDeleteSession = async (
    e: React.MouseEvent,
    sessionId: string
  ) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this session?")) {
      await deleteSession(sessionId);
    }
  };

  const sidebarClasses = clsx(
    "fixed md:relative h-full border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out bg-white dark:bg-gray-900",
    {
      "translate-x-0": isOpen,
      "-translate-x-full": !isOpen && isMobile,
      "hidden md:flex": !isOpen && !isMobile,
      flex: isOpen || !isMobile,
      "z-40": isMobile,
    }
  );

  return (
    <aside className={sidebarClasses}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div
            className={clsx(
              "flex items-center justify-between",
              isCollapsed && "justify-center"
            )}
          >
            {!isCollapsed && (
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Chat History
              </h2>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={clsx("p-1", isCollapsed && "mx-auto")}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <Button
            title={isCollapsed ? "New Chat" : undefined}
            variant="primary"
            onClick={handleNewChat}
            icon={<Plus className="w-4 h-4" />}
            fullWidth
            className={clsx("justify-center", isCollapsed && "px-2")}
          >
            {!isCollapsed && "New Chat"}
          </Button>
        </div>

        {/* Sessions List */}
        <div className={clsx("flex-1", !isCollapsed && "overflow-y-auto")}>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <LoadingSpinner />
            </div>
          ) : sessions.length === 0 ? (
            <div className="p-4 text-center">
              <MessageSquare className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No chat history yet
              </p>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {sessions.map((session) => (
                <SessionItem
                  key={session.id}
                  session={session}
                  isActive={currentSession?.id === session.id}
                  isCollapsed={isCollapsed}
                  onClick={() => handleSessionClick(session.id)}
                  onDelete={(e: React.MouseEvent) =>
                    handleDeleteSession(e, session.id)
                  }
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-purple-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Guest User
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Free Plan
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
