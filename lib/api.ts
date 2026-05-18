// Read the API URL from environment variable
// The '!' tells TypeScript "trust me, this exists"
// We add a fallback just in case

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://api.escuelajs.co/api/v1'   // ← fallback if .env is missing

export async function fetcher<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `API Error: ${response.status}`)
  }

  return response.json() as Promise<T>
}