import { Request, Response } from "express";
import { chatService } from "@/services/ChatService";
import {
  SendMessageRequest,
  UpdateFeedbackRequest,
  ApiResponse,
} from "@/types";

/**
 * Chat Controller
 * Handles HTTP requests for chat operations
 */
export class ChatController {
  /**
   * Start a new chat session
   * POST /api/chat/start
   */
  public startChat = async (_req: Request, res: Response): Promise<void> => {
    try {
      const result = chatService.startNewChat();
      this.sendResponse(res, result);
    } catch (error) {
      this.sendError(res, "Failed to start chat session", 500);
    }
  };

  /**
   * Send a message in a session
   * POST /api/chat/:sessionId/message
   */
  public sendMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const { sessionId } = req.params;
      const { question } = req.body as SendMessageRequest;
      // Validate input
      if (
        !question ||
        typeof question !== "string" ||
        question.trim().length === 0
      ) {
        this.sendError(res, "Question is required and cannot be empty", 400);
        return;
      }
      const result = await chatService.processQuestion(sessionId, question);
      this.sendResponse(res, result);
    } catch (error) {
      this.sendError(res, "Failed to process message", 500);
    }
  };

  /**
   * Update message feedback
   * PUT /api/chat/:sessionId/message/:messageId/feedback
   */
  public updateFeedback = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { sessionId, messageId } = req.params;
      const { feedback } = req.body as UpdateFeedbackRequest;
      // Validate messageId
      const messageIdNum = parseInt(messageId, 10);
      if (isNaN(messageIdNum) || messageIdNum <= 0) {
        this.sendError(res, "Invalid message ID", 400);
        return;
      }
      const result = chatService.updateMessageFeedback(
        sessionId,
        messageIdNum,
        feedback
      );
      this.sendResponse(res, result);
    } catch (error) {
      this.sendError(res, "Failed to update feedback", 500);
    }
  };

  /**
   * Get chat health status
   * GET /api/chat/health
   */
  public getHealth = async (_req: Request, res: Response): Promise<void> => {
    try {
      const healthStatus = chatService.getHealthStatus();
      res.status(200).json({
        success: true,
        data: healthStatus,
        message: "Chat service is healthy",
      });
    } catch (error) {
      this.sendError(res, "Failed to get health status", 500);
    }
  };

  /**
   * Send standardized API response
   */
  private sendResponse(
    res: Response,
    result: ApiResponse,
    statusCode: number = 200
  ): void {
    const response = {
      success: result.success,
      data: result.data,
      error: result.error,
      message: result.message,
      timestamp: new Date().toISOString(),
    };
    res.status(statusCode).json(response);
  }

  /**
   * Send standardized error response
   */
  private sendError(
    res: Response,
    error: string,
    statusCode: number = 500
  ): void {
    const response: ApiResponse = {
      success: false,
      error,
      message: "An error occurred",
    };
    res.status(statusCode).json(response);
  }
}

// Export controller instance
export const chatController = new ChatController();
