import express from "express";
import helmet from "helmet";
import cors from "cors";

import healthRoutes from "./routes/health.routes.js";
import medicineRoutes from "./routes/medicine.routes.js";
import batchRoutes from "./routes/batch.routes.js";

const app = express();


app.use(helmet());

app.use(cors());

app.use(express.json());

app.use("/health", healthRoutes);


app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Pharmacy Management API",
        version: "1.0.0"
    });
});

app.use("/api/v1/medicines", medicineRoutes);

app.use("/api/v1/batches", batchRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  if (err.code === "P2002") {
    return res.status(409).json({
      success: false,
      message: "A record with this unique value already exists"
    });
  }

  if (err.code === "P2025") {
    return res.status(404).json({
      success: false,
      message: "Requested record was not found"
    });
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: statusCode === 500
      ? "Internal Server Error"
      : err.message
  });
});

export default app;