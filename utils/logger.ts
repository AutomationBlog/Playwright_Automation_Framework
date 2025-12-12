import winston from 'winston';
import path from 'path';
import fs from 'fs-extra';

const logsDir = path.join(process.cwd(), 'reports', 'logs');
const testLog = path.join(logsDir, 'test.log');
const exceptionsLog = path.join(logsDir, 'exceptions.log');
const { combine, timestamp, printf } = winston.format;

// Ensure logs directory exists and remove previous logs on startup
try {
  fs.ensureDirSync(logsDir);
  // Remove old logs so each run starts fresh
  if (fs.pathExistsSync(testLog)) fs.removeSync(testLog);
  if (fs.pathExistsSync(exceptionsLog)) fs.removeSync(exceptionsLog);
} catch (err) {
  // If cleanup fails, still proceed to create logger — log to console
  // eslint-disable-next-line no-console
  console.warn('Failed to clean logs directory:', err);
}

const myFormat = printf(({ level, message, timestamp }) => `${timestamp} [${level}] ${message}`);

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), myFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: testLog })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: exceptionsLog })
  ]
});

export default logger;
