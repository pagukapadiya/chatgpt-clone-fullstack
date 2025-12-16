import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ChatProvider } from "@/contexts/ChatContext";
import { LandingPage } from "@/pages/LandingPage";
import { ChatPage } from "@/pages/ChatPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ROUTES } from "@/utils/constants";
import "./styles/globals.css";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ChatProvider>
          {" "}
          {/* ← Now inside Router */}
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Routes>
              <Route path={ROUTES.HOME} element={<LandingPage />} />
              <Route path={ROUTES.CHAT} element={<ChatPage />} />
              <Route path={ROUTES.CHAT_SESSION} element={<ChatPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </div>
        </ChatProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
