import { Router } from "express";
import { pool } from "../db/pool.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/services
router.get("/", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM services ORDER BY id");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch services", detail: err.message });
  }
});

// GET /api/services/:id
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM services WHERE id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: "Service not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch service", detail: err.message });
  }
});

// POST /api/services/:id/book
router.post("/:id/book", requireAuth, async (req, res) => {
  const { address, preferredDate, preferredTime, notes } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO service_requests (service_id, user_id, address, preferred_date, preferred_time, notes) VALUES (?, ?, ?, ?, ?, ?)",
      [req.params.id, req.user.id, address || null, preferredDate || null, preferredTime || null, notes || null]
    );
    res.status(201).json({ id: result.insertId, status: "REQUESTED" });
  } catch (err) {
    res.status(500).json({ error: "Failed to book service", detail: err.message });
  }
});

export default router;
