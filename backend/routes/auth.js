import { Router } from "express";
import { pool } from "../db/pool.js";
import { signToken } from "../middleware/auth.js";

const router = Router();

// POST /api/auth/register — first-time public user (mobile + name)
router.post("/register", async (req, res) => {
  const { name, mobile, cityId, areaId } = req.body;
  if (!name || !mobile) return res.status(400).json({ error: "name and mobile are required" });

  try {
    const [existing] = await pool.query("SELECT id FROM users WHERE mobile = ?", [mobile]);
    let userId;
    if (existing.length) {
      userId = existing[0].id;
    } else {
      const [result] = await pool.query(
        "INSERT INTO users (name, mobile, role, city_id, area_id) VALUES (?, ?, 'public', ?, ?)",
        [name, mobile, cityId || null, areaId || null]
      );
      userId = result.insertId;
    }
    const token = signToken({ id: userId, role: "public", name, mobile });
    res.json({ token, user: { id: userId, name, mobile, role: "public" } });
  } catch (err) {
    res.status(500).json({ error: "Registration failed", detail: err.message });
  }
});

// POST /api/auth/login — public user login by mobile (demo: no OTP verification)
router.post("/login", async (req, res) => {
  const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ error: "mobile is required" });

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE mobile = ?", [mobile]);
    if (!rows.length) return res.status(404).json({ error: "No account found for this mobile number" });
    const user = rows[0];
    const token = signToken({ id: user.id, role: user.role, name: user.name, mobile: user.mobile });
    res.json({ token, user: { id: user.id, name: user.name, mobile: user.mobile, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: "Login failed", detail: err.message });
  }
});

// POST /api/auth/admin-login — shared admin workspace login
router.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || "admin@bhoomisaathi.in";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (email?.toLowerCase() !== adminEmail.toLowerCase() || password !== adminPassword) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = signToken({ id: 0, role: "admin", name: "Admin", email: adminEmail });
  res.json({ token, user: { name: "Admin", email: adminEmail, role: "admin" } });
});

export default router;
