import React, { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useResponsive } from "@/hooks/useResponsive";

interface LayoutProps {
  children: ReactNode;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  sidebarOpen,
  toggleSidebar,
}) => {
  const { isMobile } = useResponsive();

  const handleCloseSidebar = () => {
    if (isMobile && sidebarOpen) {
      toggleSidebar();
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => toggleSidebar()} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Overlay for mobile */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={handleCloseSidebar}
            aria-hidden="true"
          />
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full">{children}</div>
        </main>
      </div>
    </div>
  );
};
