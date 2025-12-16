import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/Button";
import { useChat } from "@/hooks/useChat";
import { useResponsive } from "@/hooks/useResponsive";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  sidebarOpen,
  toggleSidebar,
}) => {
  const { currentSession } = useChat();
  const { isMobile } = useResponsive();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        <div className="flex items-center space-x-4">
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          )}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <span className="text-white font-bold">AI</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Assignment AI
            </h1>
          </div>
          {currentSession && !isMobile && (
            <div className="hidden md:block ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Session:
              </span>
              <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                {currentSession.title}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Guest User
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Free Plan
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-purple-500" />
          </div>
        </div>
      </div>
    </header>
  );
};
