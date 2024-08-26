import dotenv from "dotenv";
import express, { Express } from "express";
import prisma from "./lib/prisma";
import { errorHandler } from "./middleware/error-handler";
import { notFound } from "./middleware/not-found";
import router from "./routers/school.router";
import { logger, morganMiddleware } from "./utils/logger";

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morganMiddleware);
app.use("/api/v1", router);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	logger.info(`Server running on port ${PORT}`);
});

process.on("SIGINT", async () => {
	await prisma.$disconnect();
	logger.info("SIGINT signal received. Stopping server.");
	process.exit();
});
