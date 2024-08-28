import dotenv from "dotenv";
import express, { Express } from "express";
import prisma from "./lib/prisma";
import { errorHandler } from "./middleware/error-handler";
import { notFound } from "./middleware/not-found";
import router from "./routers/school.router";

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/health", (req, res) => {
	res.status(200).json({ message: "Healthy" });
});
app.use("/api/v1", router);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", async () => {
	await prisma.$disconnect();
	process.exit();
});
