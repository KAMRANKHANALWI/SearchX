import { ERROR_MESSAGES } from "@/constants";

export enum ErrorType {
  NETWORK = "network",
  API = "api",
  PARSING = "parsing",
  AUTHENTICATION = "authentication",
  GENERAL = "general",
}

export interface AppError {
  type: ErrorType;
  message: string;
  originalError?: unknown;
  timestamp: Date;
}

/**
 * Creates a standardized error object
 * @param type - The type of error
 * @param message - Custom error message (optional)
 * @param originalError - The original error object (optional)
 * @returns Standardized AppError object
 */
export const createError = (
  type: ErrorType,
  message?: string,
  originalError?: unknown
): AppError => {
  const defaultMessages = {
    [ErrorType.NETWORK]: ERROR_MESSAGES.SERVER_ERROR,
    [ErrorType.API]: ERROR_MESSAGES.API_EXHAUSTED,
    [ErrorType.PARSING]: "Failed to parse data",
    [ErrorType.AUTHENTICATION]: "Authentication failed",
    [ErrorType.GENERAL]: "An unexpected error occurred",
  };

  return {
    type,
    message: message || defaultMessages[type],
    originalError,
    timestamp: new Date(),
  };
};

/**
 * Logs errors in a consistent format
 * @param error - The AppError to log
 */
export const logError = (error: AppError): void => {
  console.error(`[${error.type.toUpperCase()}] ${error.message}`, {
    timestamp: error.timestamp.toISOString(),
    originalError: error.originalError,
  });
};

/**
 * Handles errors by logging them and returning a user-friendly message
 * @param error - The error to handle
 * @param type - The type of error
 * @param customMessage - Custom message for the user
 * @returns User-friendly error message
 */
export const handleError = (
  error: unknown,
  type: ErrorType = ErrorType.GENERAL,
  customMessage?: string
): string => {
  const appError = createError(type, customMessage, error);
  logError(appError);
  return appError.message;
};

/**
 * Network error handler specifically for API calls
 * @param error - The network error
 * @returns User-friendly error message
 */
export const handleNetworkError = (error: unknown): string => {
  return handleError(error, ErrorType.NETWORK);
};

/**
 * Parsing error handler for JSON/data parsing
 * @param error - The parsing error
 * @param data - The data that failed to parse
 * @returns User-friendly error message
 */
export const handleParsingError = (error: unknown, data?: string): string => {
  const message = data
    ? `Failed to parse: ${data.substring(0, 50)}...`
    : undefined;
  return handleError(error, ErrorType.PARSING, message);
};
