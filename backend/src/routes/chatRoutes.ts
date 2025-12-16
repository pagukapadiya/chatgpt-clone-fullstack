import { Router } from "express";
import { chatController } from "@/controllers/ChatController";
import { validateRequest } from "@/middleware/validation";
import {
  sendMessageSchema,
  updateFeedbackSchema,
} from "@/middleware/validationSchemas";

const router = Router();

/**
 * @route   POST /api/chat/start
 * @desc    Start a new chat session
 * @access  Public
 */
router.post("/start", chatController.startChat);

/**
 * @route   POST /api/chat/:sessionId/message
 * @desc    Send a message in a session
 * @access  Public
 */
router.post(
  "/:sessionId/message",
  validateRequest(sendMessageSchema),
  chatController.sendMessage
);

/**
 * @route   PUT /api/chat/:sessionId/message/:messageId/feedback
 * @desc    Update feedback for a message
 * @access  Public
 */
router.put(
  "/:sessionId/message/:messageId/feedback",
  validateRequest(updateFeedbackSchema),
  chatController.updateFeedback
);

/**
 * @route   GET /api/chat/health
 * @desc    Get chat service health status
 * @access  Public
 */
router.get("/health", chatController.getHealth);

export default router;
