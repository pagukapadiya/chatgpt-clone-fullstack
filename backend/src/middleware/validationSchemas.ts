import Joi from "joi";

export const sendMessageSchema = Joi.object({
  question: Joi.string().trim().required().min(1).max(1000).messages({
    "string.empty": "Question cannot be empty",
    "string.min": "Question must be at least 1 character",
    "string.max": "Question must be less than 1000 characters",
    "any.required": "Question is required",
  }),
});

export const updateFeedbackSchema = Joi.object({
  feedback: Joi.string().valid("like", "dislike").required().messages({
    "any.only": 'Feedback must be either "like" or "dislike"',
    "any.required": "Feedback is required",
  }),
});

export const updateSessionTitleSchema = Joi.object({
  title: Joi.string().trim().required().min(1).max(100).messages({
    "string.empty": "Title cannot be empty",
    "string.min": "Title must be at least 1 character",
    "string.max": "Title must be less than 100 characters",
    "any.required": "Title is required",
  }),
});

export const sessionIdSchema = Joi.object({
  sessionId: Joi.string()
    .required()
    .pattern(/^session-[a-zA-Z0-9-]+$/)
    .messages({
      "string.pattern.base": "Invalid session ID format",
      "any.required": "Session ID is required",
    }),
});

export const messageIdSchema = Joi.object({
  messageId: Joi.string().required().pattern(/^\d+$/).messages({
    "string.pattern.base": "Message ID must be a number",
    "any.required": "Message ID is required",
  }),
});
