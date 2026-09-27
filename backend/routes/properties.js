import { Router } from "express";
import { pool } from "../db/pool.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

// GET /api/properties — public feed with filters
// query: cityId, areaId, listingType, propertyType, minPrice, maxPrice, q, verified
router.get("/", async (req, res) => {
  const { cityId, areaId, listingType, propertyType, minPrice, maxPrice, q, verified } = req.query;
  const clauses = ["status = 'PUBLISHED'"];
  const params = [];

  if (cityId) { clauses.push("city_id = ?"); params.push(cityId); }
  if (areaId) { clauses.push("area_id = ?"); params.push(areaId); }
  if (listingType) { clauses.push("listing_type = ?"); params.push(listingType); }
  if (propertyType) { clauses.push("property_type = ?"); params.push(propertyType); }
  if (minPrice) { clauses.push("price >= ?"); params.push(minPrice); }
  if (maxPrice) { clauses.push("price <= ?"); params.push(maxPrice); }
  if (verified === "true") { clauses.push("verified = TRUE"); }
  if (q) {
    clauses.push("(title LIKE ? OR title_hi LIKE ? OR khasra_number LIKE ? OR address LIKE ?)");
    const like = `%${q}%`;
    params.push(like, like, like, like);
  }

  try {
    const [rows] = await pool.query(
      `SELECT * FROM properties WHERE ${clauses.join(" AND ")} ORDER BY created_at DESC LIMIT 100`,
      params
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch properties", detail: err.message });
  }
});

// GET /api/properties/:id
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM properties WHERE id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: "Property not found" });

    const [images] = await pool.query("SELECT image_url FROM property_images WHERE property_id = ? ORDER BY sort_order", [req.params.id]);
    const [comments] = await pool.query("SELECT * FROM property_comments WHERE property_id = ? ORDER BY created_at DESC", [req.params.id]);

    res.json({ ...rows[0], images: images.map((i) => i.image_url), comments });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch property", detail: err.message });
  }
});

// POST /api/properties — create (public user → PENDING, admin → PUBLISHED)
router.post("/", requireAuth, async (req, res) => {
  const isAdmin = req.user.role === "admin";
  const {
    title, titleHi, propertyType, listingType, price, khasraNumber, propertyNumber,
    areaSqft, bedrooms, bathrooms, facing, roadWidthFt, landType, address,
    description, descriptionHi, cityId, areaId, latitude, longitude,
  } = req.body;

  if (!title || !propertyType || !listingType || !price) {
    return res.status(400).json({ error: "title, propertyType, listingType and price are required" });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO properties
        (user_id, city_id, area_id, title, title_hi, property_type, listing_type, price,
         khasra_number, property_number, area_sqft, bedrooms, bathrooms, facing, road_width_ft,
         land_type, address, description, description_hi, latitude, longitude, status, verified)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        req.user.id, cityId || null, areaId || null, title, titleHi || title, propertyType, listingType, price,
        khasraNumber || null, propertyNumber || null, areaSqft || null, bedrooms || null, bathrooms || null,
        facing || null, roadWidthFt || null, landType || null, address || null, description || null,
        descriptionHi || description || null, latitude || null, longitude || null,
        isAdmin ? "PUBLISHED" : "PENDING", isAdmin,
      ]
    );
    res.status(201).json({ id: result.insertId, status: isAdmin ? "PUBLISHED" : "PENDING" });
  } catch (err) {
    res.status(500).json({ error: "Failed to create property", detail: err.message });
  }
});

// PUT /api/properties/:id
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT user_id FROM properties WHERE id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: "Property not found" });
    if (rows[0].user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized to edit this property" });
    }

    const fields = req.body;
    const allowed = ["title", "title_hi", "price", "description", "description_hi", "address"];
    const updates = Object.keys(fields).filter((k) => allowed.includes(k));
    if (!updates.length) return res.status(400).json({ error: "No valid fields to update" });

    const setClause = updates.map((k) => `${k} = ?`).join(", ");
    await pool.query(`UPDATE properties SET ${setClause} WHERE id = ?`, [...updates.map((k) => fields[k]), req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to update property", detail: err.message });
  }
});

// POST /api/properties/:id/like
router.post("/:id/like", requireAuth, async (req, res) => {
  try {
    await pool.query("INSERT IGNORE INTO property_likes (property_id, user_id) VALUES (?, ?)", [req.params.id, req.user.id]);
    await pool.query("UPDATE properties SET likes_count = likes_count + 1 WHERE id = ?", [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to like property", detail: err.message });
  }
});

// POST /api/properties/:id/comments
router.post("/:id/comments", async (req, res) => {
  const { authorName, comment, userId } = req.body;
  if (!comment) return res.status(400).json({ error: "comment is required" });
  try {
    const [result] = await pool.query(
      "INSERT INTO property_comments (property_id, user_id, author_name, comment) VALUES (?, ?, ?, ?)",
      [req.params.id, userId || null, authorName || "Guest", comment]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: "Failed to add comment", detail: err.message });
  }
});

// POST /api/properties/:id/enquiries
router.post("/:id/enquiries", async (req, res) => {
  const { name, mobile, email, message } = req.body;
  if (!name || !mobile) return res.status(400).json({ error: "name and mobile are required" });
  try {
    const [result] = await pool.query(
      "INSERT INTO property_enquiries (property_id, name, mobile, email, message) VALUES (?, ?, ?, ?, ?)",
      [req.params.id, name, mobile, email || null, message || null]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: "Failed to send enquiry", detail: err.message });
  }
});

// ===== Admin: approval queue =====

// GET /api/properties/admin/pending
router.get("/admin/pending", requireAuth, requireAdmin, async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM properties WHERE status = 'PENDING' ORDER BY created_at ASC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pending properties", detail: err.message });
  }
});

// POST /api/properties/:id/approve
router.post("/:id/approve", requireAuth, requireAdmin, async (req, res) => {
  try {
    await pool.query("UPDATE properties SET status = 'PUBLISHED', verified = TRUE WHERE id = ?", [req.params.id]);
    await pool.query("INSERT INTO property_approvals (property_id, reviewer_id, action) VALUES (?, ?, 'APPROVED')", [req.params.id, req.user.id || null]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to approve property", detail: err.message });
  }
});

// POST /api/properties/:id/reject
router.post("/:id/reject", requireAuth, requireAdmin, async (req, res) => {
  try {
    await pool.query("UPDATE properties SET status = 'REJECTED' WHERE id = ?", [req.params.id]);
    await pool.query("INSERT INTO property_approvals (property_id, reviewer_id, action, notes) VALUES (?, ?, 'REJECTED', ?)", [req.params.id, req.user.id || null, req.body?.notes || null]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to reject property", detail: err.message });
  }
});

export default router;
