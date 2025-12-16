import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { errorHandler } from "@/middleware/errorHandler";
import chatRoutes from "@/routes/chatRoutes";
import sessionRoutes from "@/routes/sessionRoutes";
import { API_PREFIX, CORS_ORIGIN, NODE_ENV } from "@/utils/constants";

/**
 * Express Application Configuration
 */
class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  /**
   * Configure application middleware
   */
  private configureMiddleware(): void {
    // Security middleware
    this.app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", CORS_ORIGIN],
          },
        },
      })
    );

    // CORS configuration
    this.app.use(
      cors({
        origin: CORS_ORIGIN,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      })
    );

    // Body parsing
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    // Compression
    this.app.use(compression());

    // Logging
    const morganFormat = NODE_ENV === "production" ? "combined" : "dev";
    this.app.use(morgan(morganFormat));

    // Request logging middleware
    this.app.use((_req, _res, next) => {
      next();
    });
  }

  /**
   * Configure application routes
   */
  private configureRoutes(): void {
    // Health check endpoint
    this.app.get("/health", (_req, res) => {
      res.status(200).json({
        success: true,
        message: "Server is running",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: NODE_ENV,
      });
    });

    // API routes
    this.app.use(`${API_PREFIX}/chat`, chatRoutes);
    this.app.use(`${API_PREFIX}/sessions`, sessionRoutes);

    // API documentation endpoint
    this.app.get(`${API_PREFIX}/docs`, (_req, res) => {
      res.json({
        message: "ChatGPT Clone API Documentation",
        endpoints: {
          chat: {
            "POST /chat/start": "Start a new chat session",
            "POST /chat/:sessionId/message": "Send a message in a session",
            "PUT /chat/:sessionId/message/:messageId/feedback":
              "Update message feedback",
            "GET /chat/health": "Get chat service health",
          },
          sessions: {
            "GET /sessions": "Get all sessions (with pagination)",
            "GET /sessions/:sessionId": "Get session details",
            "DELETE /sessions/:sessionId": "Delete a session",
            "PUT /sessions/:sessionId/title": "Update session title",
            "GET /sessions/statistics": "Get session statistics",
          },
        },
        version: "1.0.0",
      });
    });
  }

  /**
   * Configure error handling
   */
  private configureErrorHandling(): void {
    // Global error handler
    this.app.use(errorHandler);
  }
}

// Create and export application instance
const app = new App().app;
export default app;
