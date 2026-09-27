import { Router } from "express";
import { pool } from "../db/pool.js";

const router = Router();

// GET /api/news — serves cached news. In production, a scheduled job should
// fetch from an RSS/news source and populate news_cache periodically.
router.get("/", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM news_cache ORDER BY published_at DESC LIMIT 50");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news", detail: err.message });
  }
});

export default router;
