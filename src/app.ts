import dotenv from "dotenv";
import express, { Express } from "express";
import prisma from "./lib/prisma";
import { logger, morganMiddleware } from "./utils/logger";

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morganMiddleware);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	logger.info(`Server running on port ${PORT}`);
});

process.on("SIGINT", async () => {
	await prisma.$disconnect();
	logger.info("SIGINT signal received. Stopping server.");
	process.exit();
});
