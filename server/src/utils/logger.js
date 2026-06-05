/**
 * Simple structured logger for the application
 * Logs to console with timestamp and level
 */

const LOG_LEVELS = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
};

/**
 * Logs a message with structured format
 * @param {string} level - Log level (INFO, WARN, ERROR)
 * @param {string} message - Log message
 * @param {object} [metadata] - Optional metadata to include
 */
const log = (level, message, metadata = {}) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    ...metadata,
  };

  if (level === LOG_LEVELS.ERROR) {
    console.error(JSON.stringify(logEntry));
  } else if (level === LOG_LEVELS.WARN) {
    console.warn(JSON.stringify(logEntry));
  } else {
    console.log(JSON.stringify(logEntry));
  }
};

/**
 * Logs an informational message
 * @param {string} message - Log message
 * @param {object} [metadata] - Optional metadata
 */
export const info = (message, metadata = {}) => {
  log(LOG_LEVELS.INFO, message, metadata);
};

/**
 * Logs a warning message
 * @param {string} message - Log message
 * @param {object} [metadata] - Optional metadata
 */
export const warn = (message, metadata = {}) => {
  log(LOG_LEVELS.WARN, message, metadata);
};

/**
 * Logs an error message
 * @param {string} message - Log message
 * @param {object} [metadata] - Optional metadata
 */
export const error = (message, metadata = {}) => {
  log(LOG_LEVELS.ERROR, message, metadata);
};

// Default export with convenience methods
const logger = {
  info,
  warn,
  error,
};

export default logger;