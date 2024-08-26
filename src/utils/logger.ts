import fs from "fs";
import morgan from "morgan";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logDirectory = "logs";

if (!fs.existsSync(logDirectory)) {
	fs.mkdirSync(logDirectory);
}

const logFormat = format.printf(({ level, message, timestamp }) => {
	return `${timestamp} ${level}: ${message}`;
});
const morganLogFormat = format.printf(({ level, message, timestamp }) => {
	return `${timestamp} ${level}: ${message.status} ${message.method} ${message.url}`;
});

const dailyRotateTransport = new DailyRotateFile({
	dirname: logDirectory,
	filename: "application-%DATE%.log",
	datePattern: "YYYY-MM-DD",
	maxSize: "100k",
	maxFiles: "7d",
});

const morganRotateTransport = new DailyRotateFile({
	dirname: logDirectory,
	filename: "morgan-%DATE%.log",
	datePattern: "YYYY-MM-DD",
	maxSize: "1m",
	maxFiles: "7d",
});

const logger = createLogger({
	level: "info",
	format: format.combine(
		format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
		logFormat
	),
	transports: [dailyRotateTransport],
});

const morganLogger = createLogger({
	level: "info",
	format: format.combine(
		format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
		morganLogFormat
	),
	transports: [morganRotateTransport, new transports.Console()],
});

const morganStream = {
	write: function (message: string) {
		morganLogger.info(message.trim());
	},
};

const morganMiddleware = morgan("tiny", { stream: morganStream });

export { logger, morganMiddleware };
