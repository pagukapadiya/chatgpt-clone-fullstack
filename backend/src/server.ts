import "dotenv/config";
import app from "./app";
import { PORT, NODE_ENV } from "@/utils/constants";
import { logger } from "@/utils/logger";

/**
 * Start the Express server
 */
const startServer = async (): Promise<void> => {
  try {
    // Validate environment variables
    if (!process.env.PORT) {
      console.log("PORT environment variable not set, using default: 5000");
    }

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`
        🚀 Server is running!
        📍 Environment: ${NODE_ENV}
        🌐 URL: http://localhost:${PORT}
        📅 Started at: ${new Date().toISOString()}
        📊 API Documentation: http://localhost:${PORT}/api/docs
      `);
    });

    // Graceful shutdown
    const gracefulShutdown = (signal: string): void => {
      logger.info(`Received ${signal}, starting graceful shutdown...`);

      server.close(() => {
        logger.info("HTTP server closed");
        process.exit(0);
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        logger.error(
          "Could not close connections in time, forcefully shutting down"
        );
        process.exit(1);
      }, 10000);
    };

    // Handle termination signals
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

    // Handle uncaught exceptions
    process.on("uncaughtException", (error: Error) => {
      logger.error("Uncaught Exception:", error);
      gracefulShutdown("uncaughtException");
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
      logger.error("Unhandled Rejection at:", promise, "reason:", reason);
      gracefulShutdown("unhandledRejection");
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Start the server
startServer();
