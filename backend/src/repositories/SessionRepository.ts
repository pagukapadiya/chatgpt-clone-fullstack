import { v4 as uuidv4 } from "uuid";
import { Session } from "@/models/Session";
import { Message } from "@/models/Message";
import { ISessionRepository } from "./interfaces/ISessionRepository";
import { TableData } from "@/types";

/**
 * Session Repository
 * Handles data storage and retrieval for chat sessions
 * Uses in-memory storage (for demo). In production, replace with database.
 */
export class SessionRepository implements ISessionRepository {
  private sessions: Map<string, Session>;
  private static instance: SessionRepository;

  private constructor() {
    this.sessions = new Map();
    this.initializeMockData();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): SessionRepository {
    if (!SessionRepository.instance) {
      SessionRepository.instance = new SessionRepository();
    }
    return SessionRepository.instance;
  }

  /**
   * Initialize repository with mock data for demonstration
   */
  private initializeMockData(): void {
    try {
      // Create some initial sessions for demo purposes
      const mockSessions = [
        {
          id: "session-1",
          title: "Sales Data Analysis",
          messages: [
            {
              role: "user" as const,
              content: "Can you show me sales data for Q1 2024?",
              feedback: "like" as const,
              tableData: undefined,
            },
            {
              role: "assistant" as const,
              content: "Here is the sales data for Q1 2024:",
              tableData: this.generateMockTableData("sales"),
            },
          ],
        },
        {
          id: "session-2",
          title: "Technical Discussion",
          messages: [
            {
              role: "user" as const,
              content: "Explain the MVC architecture pattern",
              feedback: "like" as const,
              tableData: undefined,
            },
            {
              role: "assistant" as const,
              content:
                "MVC (Model-View-Controller) is a software design pattern...",
              tableData: undefined,
            },
          ],
        },
        {
          id: "session-3",
          title: "User Analytics Report",
          messages: [
            {
              role: "user" as const,
              content: "Show me user engagement metrics",
              feedback: "dislike" as const,
              tableData: undefined,
            },
            {
              role: "assistant" as const,
              content: "Here are the user engagement metrics:",
              tableData: this.generateMockTableData("users"),
            },
          ],
        },
      ];

      mockSessions.forEach((sessionData) => {
        const session = new Session(sessionData.id, sessionData.title);

        sessionData.messages.forEach((msgData, index) => {
          const message = new Message(
            index + 1,
            msgData.role,
            msgData.content,
            msgData.tableData
          );
          if (msgData.feedback) {
            message.setFeedback(msgData.feedback);
          }
          session.messages.push(message);
        });

        this.sessions.set(sessionData.id, session);
      });
    } catch (error) {}
  }

  /**
   * Create a new chat session
   * @param title - Optional session title
   * @returns Newly created session
   */
  public createSession(title?: string): Session {
    const sessionId = `session-${uuidv4().slice(0, 8)}`;
    const sessionTitle = title || "New Chat";

    const session = new Session(sessionId, sessionTitle);
    this.sessions.set(sessionId, session);

    return session;
  }

  /**
   * Get session by ID
   * @param sessionId - Session identifier
   * @returns Session if found, undefined otherwise
   */
  public getSessionById(sessionId: string): Session | undefined {
    return this.sessions.get(sessionId);
  }

  /**
   * Get all sessions
   * @returns Array of all sessions
   */
  public getAllSessions(): Session[] {
    return Array.from(this.sessions.values()).sort(
      (a, b) => b.lastActivity.getTime() - a.lastActivity.getTime()
    );
  }

  /**
   * Delete a session
   * @param sessionId - Session identifier
   * @returns True if session was deleted, false if not found
   */
  public deleteSession(sessionId: string): boolean {
    const deleted = this.sessions.delete(sessionId);
    if (deleted) {
      console.log(`Deleted session: ${sessionId}`);
    }
    return deleted;
  }

  /**
   * Update session title
   * @param sessionId - Session identifier
   * @param title - New title
   * @returns True if session was updated, false if not found
   */
  public updateSessionTitle(sessionId: string, title: string): boolean {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.updateTitle(title);
      return true;
    }
    return false;
  }

  /**
   * Add message to session
   * @param sessionId - Session identifier
   * @param message - Message data
   * @returns Created message or undefined if session not found
   */
  public addMessage(
    sessionId: string,
    message: Omit<Message, "id" | "timestamp">
  ): Message | undefined {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return undefined;
    }
    const newMessage = session.addMessage(message);
    return newMessage;
  }

  /**
   * Update message feedback
   * @param sessionId - Session identifier
   * @param messageId - Message identifier
   * @param feedback - 'like' or 'dislike'
   * @returns True if feedback was updated, false otherwise
   */
  public updateMessageFeedback(
    sessionId: string,
    messageId: number,
    feedback: "like" | "dislike"
  ): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return false;
    }

    const updated = session.updateMessageFeedback(messageId, feedback);
    if (updated) {
      console.log(
        `Updated feedback for message ${messageId} in session ${sessionId}`
      );
    } else {
      console.log(`Message ${messageId} not found in session ${sessionId}`);
    }
    return updated;
  }

  /**
   * Generate mock table data for demonstration
   * @param type - Type of table data to generate
   * @returns TableData object
   */
  public generateMockTableData(type: string = "default"): TableData {
    switch (type.toLowerCase()) {
      case "sales":
      case "profit": // Added profit case
        return {
          headers: [
            "Product Category",
            "Revenue",
            "Costs",
            "Profit",
            "Profit Margin",
            "QoQ Growth",
          ],
          rows: [
            ["Laptop Pro", "$1,500,000", "$900,000", "$600,000", "40%", "+25%"],
            ["Phone X", "$2,400,000", "$1,440,000", "$960,000", "40%", "+14%"],
            ["Tablet Air", "$950,000", "$570,000", "$380,000", "40%", "+19%"],
            ["Monitor Plus", "$720,000", "$432,000", "$288,000", "40%", "+20%"],
            ["Accessories", "$480,000", "$288,000", "$192,000", "40%", "+20%"],
          ],
          caption: "Profit Analysis by Product Category (Q2 2024)",
          summary:
            "Total Profit: $2,420,000 | Average Margin: 40% | Overall Growth: +19.6%",
        };

      case "users":
        return {
          headers: [
            "Region",
            "Active Users",
            "New Signups",
            "Churn Rate",
            "Engagement",
          ],
          rows: [
            ["North America", "45,230", "3,450", "2.1%", "High"],
            ["Europe", "38,150", "2,980", "1.8%", "Medium"],
            ["Asia Pacific", "52,400", "4,120", "2.5%", "High"],
            ["South America", "18,750", "1,230", "3.2%", "Medium"],
            ["Africa", "12,300", "890", "4.1%", "Low"],
          ],
          caption: "User Metrics by Region (Last 30 Days)",
          summary:
            "Total active users: 166,830 with 12,670 new signups. Average churn rate: 2.7%.",
        };

      case "financial":
        return {
          headers: ["Department", "Budget", "Actual", "Variance", "Status"],
          rows: [
            ["Marketing", "$50,000", "$48,500", "-3%", "Under"],
            ["Research & Development", "$75,000", "$76,200", "+1.6%", "Over"],
            ["Operations", "$120,000", "$118,400", "-1.3%", "Under"],
            ["Human Resources", "$45,000", "$44,800", "-0.4%", "Under"],
            ["IT Infrastructure", "$85,000", "$87,500", "+2.9%", "Over"],
          ],
          caption: "Q4 2024 Budget vs Actual Spending",
          summary:
            "Overall spending is 0.2% under budget with most departments on track.",
        };

      case "performance":
        return {
          headers: [
            "Metric",
            "Current",
            "Previous",
            "Change",
            "Target",
            "Status",
          ],
          rows: [
            [
              "Conversion Rate",
              "4.2%",
              "3.8%",
              "+10.5%",
              "4.0%",
              "✅ Exceeded",
            ],
            [
              "Avg. Order Value",
              "$124.50",
              "$118.20",
              "+5.3%",
              "$120.00",
              "✅ Exceeded",
            ],
            [
              "Customer Satisfaction",
              "92%",
              "89%",
              "+3.4%",
              "90%",
              "✅ Exceeded",
            ],
            ["Response Time", "2.4s", "3.1s", "-22.6%", "2.5s", "✅ Improved"],
            ["Error Rate", "0.8%", "1.2%", "-33.3%", "1.0%", "✅ Better"],
          ],
          caption: "Key Performance Indicators - Current vs Previous Month",
          summary:
            "4/5 metrics exceeding targets | Overall performance: Excellent",
        };

      default:
        return {
          headers: ["Category", "Current", "Previous", "Change", "Trend"],
          rows: [
            ["Metric A", "1,250", "1,100", "+13.6%", "📈"],
            ["Metric B", "890", "920", "-3.3%", "📉"],
            ["Metric C", "2,340", "2,100", "+11.4%", "📈"],
            ["Metric D", "1,560", "1,480", "+5.4%", "📈"],
            ["Metric E", "750", "780", "-3.8%", "📉"],
          ],
          caption: "Performance Metrics Overview",
          summary:
            "3 metrics showing positive growth, 2 metrics showing decline.",
        };
    }
  }

  /**
   * Get statistics about stored data
   */
  public getStatistics(): Record<string, any> {
    const sessions = this.getAllSessions();
    const totalMessages = sessions.reduce(
      (sum, session) => sum + session.messages.length,
      0
    );

    return {
      totalSessions: sessions.length,
      totalMessages,
      averageMessagesPerSession:
        sessions.length > 0 ? totalMessages / sessions.length : 0,
      lastActivity: sessions.length > 0 ? sessions[0].lastActivity : null,
    };
  }
}

// Export singleton instance
export const sessionRepository = SessionRepository.getInstance();
