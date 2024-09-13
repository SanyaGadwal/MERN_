import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import createUserRouter from "./routes/CreateUser.js";
import loginUserRouter from "./routes/LoginUser.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Fallback for frontend URL
    methods: ["POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/reservation", reservationRouter);
app.use("/api/v1", createUserRouter); // Separate create user route
app.use("/api/v1", loginUserRouter); // Separate login route

// Test route
app.get("/", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "HELLO WORLD AGAIN"
  });
});

// Initialize database connection
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;
