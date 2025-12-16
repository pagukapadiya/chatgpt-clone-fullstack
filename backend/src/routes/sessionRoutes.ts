import { Router } from "express";
import { sessionController } from "@/controllers/SessionController";
import { validateRequest } from "@/middleware/validation";
import { updateSessionTitleSchema } from "@/middleware/validationSchemas";

const router = Router();

/**
 * @route   GET /api/sessions
 * @desc    Get all sessions with pagination
 * @access  Public
 */
router.get("/", sessionController.getAllSessions);

/**
 * @route   GET /api/sessions/:sessionId
 * @desc    Get session details by ID
 * @access  Public
 */
router.get("/:sessionId", sessionController.getSessionById);

/**
 * @route   DELETE /api/sessions/:sessionId
 * @desc    Delete a session
 * @access  Public
 */
router.delete("/:sessionId", sessionController.deleteSession);

/**
 * @route   PUT /api/sessions/:sessionId/title
 * @desc    Update session title
 * @access  Public
 */
router.put(
  "/:sessionId/title",
  validateRequest(updateSessionTitleSchema),
  sessionController.updateSessionTitle
);

/**
 * @route   GET /api/sessions/statistics
 * @desc    Get session statistics
 * @access  Public
 */
router.get("/statistics", sessionController.getStatistics);

export default router;
