import { sessionRepository } from "@/repositories/SessionRepository";
import {
  ApiResponse,
  StartChatResponse,
  SendMessageResponse,
  TableData,
} from "@/types";

/**
 * Chat Service
 * Contains business logic for chat operations
 */
export class ChatService {
  private sessionRepository = sessionRepository;

  /**
   * Start a new chat session
   * @returns ApiResponse with session details
   */
  public startNewChat(): ApiResponse<StartChatResponse> {
    try {
      const session = this.sessionRepository.createSession();

      const response: StartChatResponse = {
        sessionId: session.id,
        title: session.title,
        createdAt: session.createdAt,
      };

      return {
        success: true,
        data: response,
        message: "New chat session created successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to create new chat session",
        message: "Internal server error",
      };
    }
  }

  /**
   * Process user question and generate AI response
   * @param sessionId - Session identifier
   * @param question - User's question
   * @returns ApiResponse with assistant's message
   */
  public async processQuestion(
    sessionId: string,
    question: string
  ): Promise<ApiResponse<SendMessageResponse>> {
    try {
      // Validate session exists
      const session = this.sessionRepository.getSessionById(sessionId);
      if (!session) {
        return {
          success: false,
          error: "Session not found",
          message: "The requested chat session does not exist",
        };
      }

      // Validate question
      if (!question || question.trim().length === 0) {
        return {
          success: false,
          error: "Invalid question",
          message: "Question cannot be empty",
        };
      }

      if (question.length > 1000) {
        return {
          success: false,
          error: "Question too long",
          message: "Question must be less than 1000 characters",
        };
      }

      // Add user message to session
      const userMessage = this.sessionRepository.addMessage(sessionId, {
        role: "user",
        content: question.trim(),
        setFeedback: function (): void {
          throw new Error("Function not implemented.");
        },
        toJSON: function (): Record<string, any> {
          throw new Error("Function not implemented.");
        },
      });

      if (!userMessage) {
        throw new Error("Failed to add user message");
      }

      // Generate AI response
      const aiResponse = await this.generateAIResponse(question.trim());

      // Add assistant message to session
      const assistantMessage = this.sessionRepository.addMessage(sessionId, {
        role: "assistant",
        content: aiResponse.content,
        tableData: aiResponse.tableData,
        setFeedback: function (): void {
          throw new Error("Function not implemented.");
        },
        toJSON: function (): Record<string, any> {
          throw new Error("Function not implemented.");
        },
      });

      if (!assistantMessage) {
        throw new Error("Failed to add assistant message");
      }

      return {
        success: true,
        data: assistantMessage.toJSON() as SendMessageResponse,
        message: "Response generated successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to process question",
        message: "Internal server error",
      };
    }
  }

  /**
   * Update feedback for a message
   * @param sessionId - Session identifier
   * @param messageId - Message identifier
   * @param feedback - 'like' or 'dislike'
   * @returns ApiResponse with updated message
   */
  public updateMessageFeedback(
    sessionId: string,
    messageId: number,
    feedback: "like" | "dislike"
  ): ApiResponse<SendMessageResponse> {
    try {
      // Validate feedback
      if (!["like", "dislike"].includes(feedback)) {
        return {
          success: false,
          error: "Invalid feedback",
          message: 'Feedback must be either "like" or "dislike"',
        };
      }

      // Update feedback in repository
      const updated = this.sessionRepository.updateMessageFeedback(
        sessionId,
        messageId,
        feedback
      );

      if (!updated) {
        return {
          success: false,
          error: "Message not found",
          message: "The specified message does not exist",
        };
      }

      // Get the updated message
      const session = this.sessionRepository.getSessionById(sessionId);
      const message = session?.messages.find((m) => m.id === messageId);

      if (!message) {
        throw new Error("Message not found after update");
      }

      return {
        success: true,
        data: message.toJSON() as SendMessageResponse,
        message: "Feedback updated successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to update feedback",
        message: "Internal server error",
      };
    }
  }

  /**
   * Generate AI response based on user question
   * @param question - User's question
   * @returns Object with content and optional table data
   */
  private async generateAIResponse(question: string): Promise<{
    content: string;
    tableData?: TableData;
  }> {
    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const lowerQuestion = question.toLowerCase();
    let responseContent = "";
    let tableType: string | null = null;

    // Define keyword mappings for better matching
    const keywordMappings = {
      sales: ["sales", "revenue", "sell", "transaction"],
      profit: ["profit", "margin", "earnings", "income", "net income"],
      users: ["user", "customer", "client", "subscriber", "audience"],
      financial: [
        "budget",
        "financial",
        "cost",
        "expense",
        "spending",
        "expenditure",
      ],
      performance: ["performance", "metrics", "kpi", "analytics", "statistics"],
      growth: ["growth", "increase", "decrease", "trend"],
      comparison: ["compare", "vs", "versus", "difference", "compared"],
      help: ["help", "assist", "support", "how to", "what can"],
      greeting: [
        "hello",
        "hi",
        "hey",
        "greetings",
        "good morning",
        "good afternoon",
      ],
      thanks: ["thank", "thanks", "appreciate", "grateful"],
    };

    // Enhanced response templates
    const responseTemplates = {
      sales: (q: string) => [
        `I've analyzed the sales data for "${q}". Here are the key insights:`,
        `Based on your sales query about "${q}", here are the findings:`,
        `Sales analysis for "${q}" reveals:`,
      ],
      profit: (q: string) => [
        `I've examined profit metrics related to "${q}". Here's the analysis:`,
        `Profit analysis for "${q}" shows:`,
        `Regarding your profit question "${q}", here are the details:`,
      ],
      users: (q: string) => [
        `User statistics for "${q}" indicate:`,
        `Analyzing user data for "${q}" reveals:`,
        `Customer insights for "${q}":`,
      ],
      default: (q: string) => [
        `I understand you're asking about "${q}". Here's what I found:`,
        `Regarding "${q}", here's the information:`,
        `Analysis of "${q}" shows:`,
      ],
    };

    // Determine table type based on keywords
    for (const [type, keywords] of Object.entries(keywordMappings)) {
      if (keywords.some((keyword) => lowerQuestion.includes(keyword))) {
        tableType = type;
        break;
      }
    }

    // Generate specific responses based on detected type
    if (lowerQuestion.includes("profit") || lowerQuestion.includes("margin")) {
      const templates = responseTemplates.profit(question);
      responseContent = templates[Math.floor(Math.random() * templates.length)];
      tableType = "profit";
    } else if (
      lowerQuestion.includes("sales") ||
      lowerQuestion.includes("revenue")
    ) {
      const templates = responseTemplates.sales(question);
      responseContent = templates[Math.floor(Math.random() * templates.length)];
      tableType = "sales";
    } else if (
      lowerQuestion.includes("user") ||
      lowerQuestion.includes("customer")
    ) {
      const templates = responseTemplates.users(question);
      responseContent = templates[Math.floor(Math.random() * templates.length)];
      tableType = "users";
    } else if (
      lowerQuestion.includes("hello") ||
      lowerQuestion.includes("hi")
    ) {
      responseContent =
        "Hello! How can I assist you today? I can help with data analysis, answer questions, or provide insights. Feel free to ask about sales, profits, users, or any other business metrics.";
    } else if (lowerQuestion.includes("thank")) {
      responseContent =
        "You're welcome! If you have any more questions about data, metrics, or analysis, feel free to ask.";
    } else if (lowerQuestion.includes("help")) {
      responseContent =
        "I'm here to help you analyze data! I can provide insights on:\n• Sales and revenue metrics\n• Profit margins and earnings\n• User and customer statistics\n• Financial data and budgets\n• Performance metrics\n\nJust ask me anything about your data!";
    } else {
      const templates = responseTemplates.default(question);
      responseContent = templates[Math.floor(Math.random() * templates.length)];
    }

    // Add follow-up questions for better conversation flow
    const followUpQuestions = {
      sales:
        "\n\nWould you like more details on:\n• Regional sales breakdown\n• Product performance comparison\n• Sales trends over time?",
      profit:
        "\n\nWould you like to see:\n• Profit margins by product\n• Quarterly profit trends\n• Profit vs revenue comparison?",
      users:
        "\n\nWould you like information on:\n• User demographics\n• Engagement metrics\n• Churn analysis?",
      default: "\n\nIs there anything specific you'd like to know more about?",
    };

    if (
      tableType &&
      followUpQuestions[tableType as keyof typeof followUpQuestions]
    ) {
      responseContent +=
        followUpQuestions[tableType as keyof typeof followUpQuestions];
    }

    // Generate table data for relevant queries
    let tableData: TableData | undefined;

    // Conditions for showing table data
    const shouldShowTable =
      lowerQuestion.includes("show") ||
      lowerQuestion.includes("display") ||
      lowerQuestion.includes("table") ||
      lowerQuestion.includes("data") ||
      lowerQuestion.includes("metrics") ||
      lowerQuestion.includes("statistics") ||
      (lowerQuestion.includes("what") && lowerQuestion.includes("is")) ||
      lowerQuestion.includes("how much") ||
      lowerQuestion.includes("compare");

    if (shouldShowTable && tableType) {
      tableData = this.sessionRepository.generateMockTableData(tableType);
    }

    return {
      content: responseContent,
      tableData,
    };
  }

  /**
   * Get service health status
   */
  public getHealthStatus(): Record<string, any> {
    const stats = this.sessionRepository.getStatistics();

    return {
      status: "healthy",
      uptime: process.uptime(),
      timestamp: new Date(),
      statistics: stats,
    };
  }
}

// Export service instance
export const chatService = new ChatService();
