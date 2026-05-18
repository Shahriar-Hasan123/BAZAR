// =========================================
// SAFE IMAGE URL
// The API sometimes returns URLs wrapped in
// brackets like ["https://..."] or broken links
// This cleans and validates them
// =========================================
export function getSafeImageUrl(
  url: string | undefined,
  fallback = 'https://placehold.co/600x400/e2e8f0/94a3b8?text=No+Image'
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