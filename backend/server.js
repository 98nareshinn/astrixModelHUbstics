import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { testConnection } from "./db/pool.js";
import authRoutes from "./routes/auth.js";
import propertyRoutes from "./routes/properties.js";
import serviceRoutes from "./routes/services.js";
import mapRoutes from "./routes/maps.js";
import newsRoutes from "./routes/news.js";
import locationRoutes from "./routes/locations.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173").split(",").map((s) => s.trim());
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "bhoomi-saathi-api" }));

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/maps", mapRoutes);
app.use("/api/news", newsRoutes);
app.use("/api", locationRoutes); // /api/cities, /api/areas

// 404 handler
app.use((req, res) => res.status(404).json({ error: `No route for ${req.method} ${req.path}` }));

// Central error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, async () => {
  console.log(`Bhoomi Saathi API listening on http://localhost:${PORT}`);
  await testConnection();
});
