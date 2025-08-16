export interface Env {
  DB: D1Database;
}

import { Hono } from "hono";
import { cors } from "hono/cors";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono<{ Bindings: Env }>();

// CORS configuration
app.use("*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
}));

// Categories endpoints
app.get("/api/categories", async (c) => {
  const { results } = await c.env.DB.prepare(`
    SELECT c1.*, 
           GROUP_CONCAT(c2.id || ':' || c2.name || ':' || c2.slug) as subcategories
    FROM categories c1
    LEFT JOIN categories c2 ON c2.parent_id = c1.id
    WHERE c1.parent_id IS NULL
    GROUP BY c1.id
    ORDER BY c1.display_order
  `).all();

  const categories = results.map((cat: any) => ({
    ...cat,
    subcategories: cat.subcategories 
      ? cat.subcategories.split(',').map((sub: string) => {
          const [id, name, slug] = sub.split(':');
          return { id: parseInt(id), name, slug };
        })
      : []
  }));

  return c.json(categories);
});

app.get("/api/categories/:slug", async (c) => {
  const slug = c.req.param("slug");
  const { results } = await c.env.DB.prepare(`
    SELECT * FROM categories WHERE slug = ?
  `).bind(slug).all();

  if (results.length === 0) {
    return c.json({ error: "Category not found" }, 404);
  }

  return c.json(results[0]);
});

// Products endpoints
app.get("/api/products", async (c) => {
  const category = c.req.query("category");
  const minPrice = c.req.query("minPrice");
  const maxPrice = c.req.query("maxPrice");
  const brand = c.req.query("brand");

  let query = `
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.is_active = 1
  `;
  const params: any[] = [];

  if (category) {
    query += ` AND (c.slug = ? OR c.parent_id = (SELECT id FROM categories WHERE slug = ?))`;
    params.push(category, category);
  }

  if (minPrice) {
    query += ` AND p.price >= ?`;
    params.push(parseFloat(minPrice));
  }

  if (maxPrice) {
    query += ` AND p.price <= ?`;
    params.push(parseFloat(maxPrice));
  }

  if (brand) {
    query += ` AND p.brand = ?`;
    params.push(brand);
  }

  query += ` ORDER BY p.created_at DESC`;

  const { results } = await c.env.DB.prepare(query).bind(...params).all();
  return c.json(results);
});

app.get("/api/products/:id", async (c) => {
  const id = c.req.param("id");
  const { results } = await c.env.DB.prepare(`
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = ? AND p.is_active = 1
  `).bind(id).all();

  if (results.length === 0) {
    return c.json({ error: "Product not found" }, 404);
  }

  return c.json(results[0]);
});

// Track product clicks
app.post("/api/products/:id/click", async (c) => {
  const id = c.req.param("id");
  
  await c.env.DB.prepare(`
    UPDATE products SET click_count = click_count + 1, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(id).run();

  return c.json({ success: true });
});

// Get brands for filters
app.get("/api/brands", async (c) => {
  const { results } = await c.env.DB.prepare(`
    SELECT DISTINCT brand FROM products WHERE brand IS NOT NULL AND is_active = 1
    ORDER BY brand
  `).all();

  return c.json(results.map((r: any) => r.brand));
});

// Admin authentication
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

app.post("/api/admin/login", zValidator("json", LoginSchema), async (c) => {
  const { email, password } = c.req.valid("json");

  const { results } = await c.env.DB.prepare(`
    SELECT * FROM admin_users WHERE email = ?
  `).bind(email).all();

  if (results.length === 0) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  const user = results[0] as any;
  
  // For demo purposes, we'll use simple password check
  // In production, you should use proper bcrypt verification
  const isValidPassword = password === "admin2025";

  if (!isValidPassword) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  // In a real app, you'd generate a proper JWT token
  const token = btoa(JSON.stringify({ email, timestamp: Date.now() }));

  return c.json({ 
    success: true, 
    token,
    user: { email: user.email, id: user.id }
  });
});

// Admin middleware
const adminAuth = async (c: any, next: any) => {
  const authHeader = c.req.header("Authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const token = authHeader.split(" ")[1];
  
  try {
    const decoded = JSON.parse(atob(token));
    if (decoded.email !== "silmaraandrade3108@gmail.com") {
      throw new Error("Invalid token");
    }
    
    // Token expires after 24 hours
    if (Date.now() - decoded.timestamp > 24 * 60 * 60 * 1000) {
      throw new Error("Token expired");
    }
    
    c.set("admin", decoded);
    await next();
  } catch (error) {
    return c.json({ error: "Unauthorized" }, 401);
  }
};

// Admin product management
const ProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  image_url: z.string().url().optional(),
  category_id: z.number().positive(),
  brand: z.string().optional()
});

app.get("/api/admin/products", adminAuth, async (c) => {
  const { results } = await c.env.DB.prepare(`
    SELECT p.*, c.name as category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    ORDER BY p.created_at DESC
  `).all();

  return c.json(results);
});

app.post("/api/admin/products", adminAuth, zValidator("json", ProductSchema), async (c) => {
  const productData = c.req.valid("json");

  const { meta } = await c.env.DB.prepare(`
    INSERT INTO products (name, description, price, image_url, category_id, brand, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `).bind(
    productData.name,
    productData.description || null,
    productData.price,
    productData.image_url || null,
    productData.category_id,
    productData.brand || null
  ).run();

  return c.json({ success: true, id: meta.last_row_id });
});

app.put("/api/admin/products/:id", adminAuth, zValidator("json", ProductSchema), async (c) => {
  const id = c.req.param("id");
  const productData = c.req.valid("json");

  await c.env.DB.prepare(`
    UPDATE products 
    SET name = ?, description = ?, price = ?, image_url = ?, category_id = ?, brand = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(
    productData.name,
    productData.description || null,
    productData.price,
    productData.image_url || null,
    productData.category_id,
    productData.brand || null,
    id
  ).run();

  return c.json({ success: true });
});

app.delete("/api/admin/products/:id", adminAuth, async (c) => {
  const id = c.req.param("id");

  await c.env.DB.prepare(`
    UPDATE products SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `).bind(id).run();

  return c.json({ success: true });
});

// Admin analytics
app.get("/api/admin/analytics", adminAuth, async (c) => {
  const { results: productClicks } = await c.env.DB.prepare(`
    SELECT name, click_count FROM products 
    WHERE click_count > 0 
    ORDER BY click_count DESC 
    LIMIT 10
  `).all();

  const { results: totalProducts } = await c.env.DB.prepare(`
    SELECT COUNT(*) as count FROM products WHERE is_active = 1
  `).all();

  const { results: totalCategories } = await c.env.DB.prepare(`
    SELECT COUNT(*) as count FROM categories WHERE parent_id IS NULL
  `).all();

  return c.json({
    productClicks,
    totalProducts: (totalProducts[0] as any).count,
    totalCategories: (totalCategories[0] as any).count
  });
});

export default app;
