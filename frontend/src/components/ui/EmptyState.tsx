import React from "react";
import { MessageSquare, Search, FileText, BarChart3 } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: "message" | "search" | "file" | "chart";
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = "message",
  action,
}) => {
  const icons = {
    message: <MessageSquare className="w-12 h-12" />,
    search: <Search className="w-12 h-12" />,
    file: <FileText className="w-12 h-12" />,
    chart: <BarChart3 className="w-12 h-12" />,
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900/30 dark:to-purple-900/30 flex items-center justify-center mb-6">
        <div className="text-primary-600 dark:text-primary-400">
          {icons[icon]}
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>

      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {description}
      </p>

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};
