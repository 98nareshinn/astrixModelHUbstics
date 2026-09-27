import { Router } from "express";
import { pool } from "../db/pool.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/maps
router.get("/", async (req, res) => {
  const { areaId, q } = req.query;
  const clauses = ["1=1"];
  const params = [];
  if (areaId) { clauses.push("area_id = ?"); params.push(areaId); }
  if (q) { clauses.push("(title LIKE ? OR title_hi LIKE ?)"); params.push(`%${q}%`, `%${q}%`); }

  try {
    const [rows] = await pool.query(`SELECT * FROM map_products WHERE ${clauses.join(" AND ")} ORDER BY id`, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch maps", detail: err.message });
  }
});

// GET /api/maps/:id
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM map_products WHERE id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: "Map not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch map", detail: err.message });
  }
});

// POST /api/maps/:id/purchase — creates a pending order; connect a real payment gateway in production
router.post("/:id/purchase", requireAuth, async (req, res) => {
  try {
    const [mapRows] = await pool.query("SELECT price FROM map_products WHERE id = ?", [req.params.id]);
    if (!mapRows.length) return res.status(404).json({ error: "Map not found" });

    const [result] = await pool.query(
      "INSERT INTO map_orders (map_product_id, user_id, amount, payment_status) VALUES (?, ?, ?, 'PENDING')",
      [req.params.id, req.user.id, mapRows[0].price]
    );
    res.status(201).json({ orderId: result.insertId, status: "PENDING", note: "Connect a real payment gateway to complete this order." });
  } catch (err) {
    res.status(500).json({ error: "Failed to create order", detail: err.message });
  }
});

export default router;
