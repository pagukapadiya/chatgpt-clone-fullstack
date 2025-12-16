import { Request, Response, NextFunction } from "express";
import { ValidationError } from "@/types";

/**
 * Request validation middleware
 */
export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        const validationErrors: ValidationError[] = error.details.map(
          (detail: any) => ({
            field: detail.path.join("."),
            message: detail.message.replace(/"/g, ""),
          })
        );

        res.status(400).json({
          success: false,
          error: "Validation failed",
          message: "Invalid request data",
          errors: validationErrors,
          timestamp: new Date().toISOString(),
        });
        return;
      }

      // Replace request body with validated data
      req.body = value;
      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal validation error",
        message: "Failed to validate request",
        timestamp: new Date().toISOString(),
      });
    }
  };
};

/**
 * Validate path parameters
 */
export const validateParams = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req.params, {
        abortEarly: false,
      });

      if (error) {
        const validationErrors: ValidationError[] = error.details.map(
          (detail: any) => ({
            field: detail.path.join("."),
            message: detail.message.replace(/"/g, ""),
          })
        );

        res.status(400).json({
          success: false,
          error: "Invalid parameters",
          message: "Invalid request parameters",
          errors: validationErrors,
          timestamp: new Date().toISOString(),
        });
        return;
      }

      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal validation error",
        message: "Failed to validate parameters",
        timestamp: new Date().toISOString(),
      });
    }
  };
};
