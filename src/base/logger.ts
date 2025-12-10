import * as fs from 'fs';
import * as path from 'path';

/**
 * Logger utility for logging test execution
 */
export class Logger {
  private logDir: string;
  private logFile: string;
  private logsArray: any[] = [];

  constructor() {
    this.logDir = path.join(process.cwd(), 'logs');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.logFile = path.join(this.logDir, `test-${timestamp}.log`);
    
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  /**
   * Get timestamp for logs
   */
  private getTimestamp(): string {
    return new Date().toLocaleString();
  }

  /**
   * Format log message
   */
  private formatMessage(level: string, message: string): string {
    return `[${this.getTimestamp()}] [${level}] ${message}`;
  }

  /**
   * Write to log file
   */
  private writeToFile(message: string): void {
    try {
      fs.appendFileSync(this.logFile, message + '\n');
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  /**
   * Log info messages
   */
  info(message: string): void {
    const formattedMessage = this.formatMessage('INFO', message);
    console.log(formattedMessage);
    this.writeToFile(formattedMessage);
    this.logsArray.push({
      timestamp: this.getTimestamp(),
      level: 'INFO',
      message: message,
    });
  }

  /**
   * Log warning messages
   */
  warn(message: string): void {
    const formattedMessage = this.formatMessage('WARN', message);
    console.warn(formattedMessage);
    this.writeToFile(formattedMessage);
    this.logsArray.push({
      timestamp: this.getTimestamp(),
      level: 'WARN',
      message: message,
    });
  }

  /**
   * Log error messages
   */
  error(message: string): void {
    const formattedMessage = this.formatMessage('ERROR', message);
    console.error(formattedMessage);
    this.writeToFile(formattedMessage);
    this.logsArray.push({
      timestamp: this.getTimestamp(),
      level: 'ERROR',
      message: message,
    });
  }

  /**
   * Log debug messages
   */
  debug(message: string): void {
    const formattedMessage = this.formatMessage('DEBUG', message);
    console.debug(formattedMessage);
    this.writeToFile(formattedMessage);
    this.logsArray.push({
      timestamp: this.getTimestamp(),
      level: 'DEBUG',
      message: message,
    });
  }

  /**
   * Get all logs
   */
  getAllLogs(): any[] {
    return this.logsArray;
  }

  /**
   * Get log file path
   */
  getLogFilePath(): string {
    return this.logFile;
  }

  /**
   * Clear logs array
   */
  clearLogs(): void {
    this.logsArray = [];
  }
}
