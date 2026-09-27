import { Router } from "express";
import { pool } from "../db/pool.js";

const router = Router();

// GET /api/cities
router.get("/cities", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM cities WHERE status = 'active' ORDER BY name");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cities", detail: err.message });
  }
});

// GET /api/areas?cityId=...
router.get("/areas", async (req, res) => {
  const { cityId } = req.query;
  try {
    const [rows] = cityId
      ? await pool.query("SELECT * FROM areas WHERE city_id = ? ORDER BY name", [cityId])
      : await pool.query("SELECT * FROM areas ORDER BY name");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch areas", detail: err.message });
  }
});

export default router;
