import React, { useState } from "react";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { Layout } from "@/components/layout/Layout";

export const ChatPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Layout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
      <ChatInterface />
    </Layout>
  );
};
