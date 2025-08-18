import { useState, useEffect } from 'react';
import { Category, Product } from '@/shared/types';

const API_BASE = '';

// Custom hook for fetching categories
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/categories`)
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { categories, loading, error };
}

// Custom hook for fetching products
export function useProducts(filters?: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.brand) params.append('brand', filters.brand);

    const url = `${API_BASE}/api/products${params.toString() ? `?${params.toString()}` : ''}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [filters?.category, filters?.minPrice, filters?.maxPrice, filters?.brand]);

  return { products, loading, error, refetch: () => {
    setLoading(true);
    // Trigger useEffect
  }};
}

// Custom hook for fetching brands
export function useBrands() {
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/brands`)
      .then(res => res.json())
      .then(data => {
        setBrands(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return { brands, loading };
}

// Function to track product clicks
export async function trackProductClick(productId: number) {
  try {
    await fetch(`${API_BASE}/api/products/${productId}/click`, {
      method: 'POST',
    });
  } catch (error) {
    console.error('Error tracking product click:', error);
  }
}

// Function to generate WhatsApp link
export function generateWhatsAppLink(product: Product) {
  const phone = '5544984547340'; // Brazilian WhatsApp format
  const message = `Olá, tenho interesse no produto ${product.name}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// Function to generate WhatsApp link for cart
export function generateWhatsAppCartLink(items: { product: Product; quantity: number }[]) {
  const phone = '5544984547340';
  let message = 'Olá, tenho interesse nos seguintes produtos:\n\n';
  
  items.forEach(item => {
    message += `• ${item.product.name} (Quantidade: ${item.quantity}) - R$ ${item.product.price.toFixed(2)}\n`;
  });
  
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  message += `\nTotal: R$ ${total.toFixed(2)}`;
  
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
