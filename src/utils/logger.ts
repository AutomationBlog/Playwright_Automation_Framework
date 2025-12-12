import winston from 'winston';
import path from 'path';

const logsDir = path.join(process.cwd(), 'reports', 'logs');
const { combine, timestamp, printf } = winston.format;

const myFormat = printf(({ level, message, timestamp }) => `${timestamp} [${level}] ${message}`);

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), myFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logsDir, 'test.log') })
  ]
});

export default logger;
