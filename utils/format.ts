// =========================================
// FORMAT PRICE
// Converts a number to a currency string
// Example: 1999 → "$1,999.00"
// =========================================
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}