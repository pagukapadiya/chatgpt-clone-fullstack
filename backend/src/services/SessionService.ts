import { sessionRepository } from "@/repositories/SessionRepository";
import { Session } from "@/models/Session";
import { ApiResponse, PaginationParams, PaginatedResponse } from "@/types";

/**
 * Session Service
 * Contains business logic for session operations
 */
export class SessionService {
  private sessionRepository = sessionRepository;

  /**
   * Get all sessions with pagination
   * @param params - Pagination parameters
   * @returns Paginated response of sessions
   */
  public getAllSessions(
    params: PaginationParams = {}
  ): PaginatedResponse<Record<string, any>> {
    try {
      const page = Math.max(1, params.page || 1);
      const limit = Math.min(50, Math.max(1, params.limit || 10));
      const sortBy = params.sortBy || "lastActivity";
      const sortOrder = params.sortOrder || "desc";

      // Get all sessions
      let sessions = this.sessionRepository.getAllSessions();

      // Apply sorting
      sessions = this.sortSessions(sessions, sortBy, sortOrder);

      // Apply pagination
      const total = sessions.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = Math.min(startIndex + limit, total);
      const paginatedSessions = sessions.slice(startIndex, endIndex);

      return {
        success: true,
        data: paginatedSessions.map((session) => session.toJSON()),
        message: "Sessions retrieved successfully",
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      return {
        success: false,
        data: [] as Record<string, any>[],
        error: "Failed to retrieve sessions",
        message: "Internal server error",
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
        },
      };
    }
  }

  /**
   * Get session details by ID
   * @param sessionId - Session identifier
   * @returns ApiResponse with session details
   */
  public getSessionById(sessionId: string): ApiResponse<Record<string, any>> {
    try {
      const session = this.sessionRepository.getSessionById(sessionId);

      if (!session) {
        return {
          success: false,
          error: "Session not found",
          message: "The requested session does not exist",
        };
      }

      return {
        success: true,
        data: session.getFullHistory(),
        message: "Session retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to retrieve session",
        message: "Internal server error",
      };
    }
  }

  /**
   * Delete a session
   * @param sessionId - Session identifier
   * @returns ApiResponse indicating success/failure
   */
  public deleteSession(sessionId: string): ApiResponse<void> {
    try {
      const deleted = this.sessionRepository.deleteSession(sessionId);

      if (!deleted) {
        return {
          success: false,
          error: "Session not found",
          message: "The session does not exist",
        };
      }

      return {
        success: true,
        message: "Session deleted successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to delete session",
        message: "Internal server error",
      };
    }
  }

  /**
   * Update session title
   * @param sessionId - Session identifier
   * @param title - New title
   * @returns ApiResponse indicating success/failure
   */
  public updateSessionTitle(
    sessionId: string,
    title: string
  ): ApiResponse<void> {
    try {
      // Validate title
      if (!title || title.trim().length === 0) {
        return {
          success: false,
          error: "Invalid title",
          message: "Title cannot be empty",
        };
      }

      if (title.length > 100) {
        return {
          success: false,
          error: "Title too long",
          message: "Title must be less than 100 characters",
        };
      }

      const updated = this.sessionRepository.updateSessionTitle(
        sessionId,
        title.trim()
      );

      if (!updated) {
        return {
          success: false,
          error: "Session not found",
          message: "The session does not exist",
        };
      }

      return {
        success: true,
        message: "Session title updated successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to update session title",
        message: "Internal server error",
      };
    }
  }

  /**
   * Get session statistics
   */
  public getStatistics(): ApiResponse<any> {
    try {
      const stats = this.sessionRepository.getStatistics();

      return {
        success: true,
        data: stats,
        message: "Statistics retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to retrieve statistics",
        message: "Internal server error",
      };
    }
  }

  /**
   * Sort sessions by specified field
   */
  private sortSessions(
    sessions: Session[],
    sortBy: string,
    sortOrder: "asc" | "desc"
  ): Session[] {
    return sessions.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "createdAt":
          aValue = a.createdAt.getTime();
          bValue = b.createdAt.getTime();
          break;
        case "messageCount":
          aValue = a.messages.length;
          bValue = b.messages.length;
          break;
        case "lastActivity":
        default:
          aValue = a.lastActivity.getTime();
          bValue = b.lastActivity.getTime();
          break;
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }
}

// Export service instance
export const sessionService = new SessionService();
