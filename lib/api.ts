const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://api.escuelajs.co/api/v1'

// =========================================
// CUSTOM API ERROR CLASS
// Lets us attach a status code to the error
// Useful for showing different messages
// e.g. 404 → "Not found" vs 500 → "Server error"
// =========================================
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

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
    throw new ApiError(
      error.message || `API Error: ${response.status}`,
      response.status
    )
  }

  return response.json() as Promise<T>
}