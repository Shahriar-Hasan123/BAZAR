// =========================================
// SAFE IMAGE URL
// The API sometimes returns URLs wrapped in
// brackets like ["https://..."] or broken links
// This cleans and validates them
// =========================================
export function getSafeImageUrl(
  url: string | undefined,
  fallback = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%23e2e8f0%22 width=%22400%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22sans-serif%22 font-size=%2216%22 fill=%22%2394a3b8%22%3ENo Image%3C/text%3E%3C/svg%3E'
): string {
  if (!url) return fallback

  // Remove brackets or quotes the API sometimes wraps around URLs
  const cleaned = url.replace(/[\[\]"]/g, '').trim()

  // Validate it is a real URL
  try {
    new URL(cleaned)
    return cleaned
  } catch {
    return fallback
  }
}