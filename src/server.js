import { config } from "dotenv";
import express from "express";
import { connectDB, disconnectDB, prisma } from "./config/db.js";

config();
connectDB();

const app = express();
const PORT = 5001;

//Import Routes
import movieRoutes from "./routes/movieRoutes.js";

//API Routes
app.use("/movies", movieRoutes);

app.get("/hello", (req, res) => {
  res.json({ message: "hello world" });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// when app is Gracefully shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
