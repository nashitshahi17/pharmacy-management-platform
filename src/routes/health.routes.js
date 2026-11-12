import express from "express";
import prisma from "../config/database.js";

const router = express.Router();

router.get("/live", (req, res) => {
  res.status(200).json({
    success: true,
    status: "alive",
    message: "Pharmacy API is running"
  });
});

router.get("/ready", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      status: "ready",
      dependencies: {
        database: "connected"
      }
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      status: "not_ready",
      dependencies: {
        database: "disconnected"
      }
    });
  }
});

export default router;