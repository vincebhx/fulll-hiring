export class LoggerService {
  /**
   * Log formatted info
   * @param message
   * @param optionalParams
   */
  static info(message?: unknown, ...optionalParams: unknown[]) {
    console.info("\x1b[36mINFO:", message, ...optionalParams);
  }

  /**
   * Log formatted errors
   * @param err
   * @param optionalParams
   */
  static error(err?: unknown, ...optionalParams: unknown[]) {
    console.error(
      "\x1b[31mERROR:",
      err instanceof Error ? err.message : err,
      ...optionalParams,
    );
  }
}
