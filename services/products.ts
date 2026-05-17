import { fetcher } from "@/lib/api";
import type { Product, ProductsParams } from "@/types";

// GET ALL PRODUCTS
// Supports all filter params from the API
export async function getProducts(params?: ProductsParams): Promise<Product[]> {
  // Build the query string from params object
  const searchParams = new URLSearchParams();

  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.offset) searchParams.set("offset", String(params.offset));
  if (params?.title) searchParams.set("title", params.title);
  if (params?.price_min)
    searchParams.set("price_min", String(params.price_min));
  if (params?.price_max)
    searchParams.set("price_max", String(params.price_max));
  if (params?.categoryId)
    searchParams.set("categoryId", String(params.categoryId));
  if (params?.categorySlug)
    searchParams.set("categorySlug", params.categorySlug);

  const query = searchParams.toString();
  const endpoint = `/products${query ? `?${query}` : ""}`;

  return fetcher<Product[]>(endpoint);
}

// GET SINGLE PRODUCT BY ID
export async function getProductById(id: number): Promise<Product> {
  return fetcher<Product>(`/products/${id}`);
}

// GET SINGLE PRODUCT BY SLUG
export async function getProductBySlug(slug: string): Promise<Product> {
  return fetcher<Product>(`/products/slug/${slug}`);
}

// GET RELATED PRODUCTS
export async function getRelatedProducts(id: number): Promise<Product[]> {
  return fetcher<Product[]>(`/products/${id}/related`);
}

// GET FEATURED PRODUCTS (just a helper)
export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  return getProducts({ limit, offset: 0 });
}
