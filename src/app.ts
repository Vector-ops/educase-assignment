import dotenv from "dotenv";
import express, { Express } from "express";

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", async () => {
	await prisma.$disconnect();
	process.exit();
});
