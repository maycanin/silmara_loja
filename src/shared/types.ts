import z from "zod";

// Product related schemas and types
export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  image_url: z.string().nullable(),
  category_id: z.number(),
  brand: z.string().nullable(),
  is_active: z.number(),
  click_count: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  category_name: z.string().optional(),
  category_slug: z.string().optional(),
});

export type Product = z.infer<typeof ProductSchema>;

// Category related schemas and types
export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  parent_id: z.number().nullable(),
  display_order: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  subcategories: z.array(z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
  })).optional(),
});

export type Category = z.infer<typeof CategorySchema>;

// Cart item type
export interface CartItem {
  product: Product;
  quantity: number;
}

// Admin types
export interface AdminUser {
  id: number;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ProductForm {
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category_id: number;
  brand?: string;
}
