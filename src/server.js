import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import prisma from "./config/database.js";

const PORT = process.env.PORT || 3000;

let server;

const startServer = async () => {
  try {
    await prisma.$connect();

    console.log("PostgreSQL connected successfully");

    server = app.listen(PORT, () => {
      console.log(`Pharmacy API running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error("Application startup failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

const shutdown = (signal) => {
  console.log(`${signal} received. Starting graceful shutdown...`);

  if (!server) {
    prisma.$disconnect().finally(() => process.exit(0));
    return;
  }

  server.close(async () => {
    await prisma.$disconnect();

    console.log("HTTP server closed");
    console.log("Database connection closed");

    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

startServer();