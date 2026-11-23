import pool from "./config/database.js";

// const [rows] = await pool.query("SELECT * FROM customers");

// console.log(rows);

import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

fastify.get("/", async () => {
  return {
    message: "My Node.js REST API is running",
    status: "OK",
  };
});

fastify.get("/api/health", async () => {
  return {
    success: true,
    message: "API is healthy",
  };
});

fastify.get("/api/customers", async () => {
  const [rows] = await pool.query("SELECT * FROM customers");

  return rows;
  // return {
  //   success: true,
  //   message: "API is healthy",
  // };
});

// Your other routes
// fastify.register(equipmentRoutes);
// fastify.register(activityRoutes);

const start = async () => {
  try {
    await fastify.listen({
      port: process.env.PORT || 3000,
      host: "0.0.0.0",
    });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
