import { Request, Response } from "express";
import { sessionService } from "@/services/SessionService";
import { ApiResponse, PaginationParams } from "@/types";

/**
 * Session Controller
 * Handles HTTP requests for session operations
 */
export class SessionController {
  /**
   * Get all sessions with pagination
   * GET /api/sessions
   */
  public getAllSessions = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const paginationParams: PaginationParams = {
        page: parseInt(req.query.page as string) || undefined,
        limit: parseInt(req.query.limit as string) || undefined,
        sortBy: (req.query.sortBy as string) || undefined,
        sortOrder: (req.query.sortOrder as "asc" | "desc") || undefined,
      };
      const result = sessionService.getAllSessions(paginationParams);
      this.sendResponse(res, result);
    } catch (error) {
      this.sendError(res, "Failed to retrieve sessions", 500);
    }
  };

  /**
   * Get session details by ID
   * GET /api/sessions/:sessionId
   */
  public getSessionById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { sessionId } = req.params;
      const result = sessionService.getSessionById(sessionId);
      this.sendResponse(res, result);
    } catch (error) {
      this.sendError(res, "Failed to retrieve session", 500);
    }
  };

  /**
   * Delete a session
   * DELETE /api/sessions/:sessionId
   */
  public deleteSession = async (req: Request, res: Response): Promise<void> => {
    try {
      const { sessionId } = req.params;
      const result = sessionService.deleteSession(sessionId);
      this.sendResponse(res, result, result.success ? 200 : 404);
    } catch (error) {
      this.sendError(res, "Failed to delete session", 500);
    }
  };

  /**
   * Update session title
   * PUT /api/sessions/:sessionId/title
   */
  public updateSessionTitle = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { sessionId } = req.params;
      const { title } = req.body;
      if (!title || typeof title !== "string") {
        this.sendError(res, "Title is required", 400);
        return;
      }
      const result = sessionService.updateSessionTitle(sessionId, title);
      this.sendResponse(res, result);
    } catch (error) {
      this.sendError(res, "Failed to update session title", 500);
    }
  };

  /**
   * Get session statistics
   * GET /api/sessions/statistics
   */
  public getStatistics = async (
    _req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const result = sessionService.getStatistics();
      this.sendResponse(res, result);
    } catch (error) {
      this.sendError(res, "Failed to retrieve statistics", 500);
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
export const sessionController = new SessionController();
