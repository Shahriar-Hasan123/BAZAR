// =========================================
// BASE SKELETON
// A single animated gray block
// =========================================
function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
      aria-hidden="true"
    />
  )
}

// =========================================
// PRODUCT CARD SKELETON
// Matches the exact shape of ProductCard
// So layout does not shift when real card loads
// =========================================
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

      {/* Image area */}
      <Skeleton className="aspect-square w-full rounded-none" />

      {/* Info area */}
      <div className="p-4 space-y-3">
        {/* Category badge */}
        <Skeleton className="h-3 w-1/3" />
        {/* Title */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        {/* Price and button */}
        <div className="flex justify-between items-center pt-1">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-8 w-1/4 rounded-lg" />
        </div>
      </div>

    </div>
  )
}

// =========================================
// PRODUCT GRID SKELETON
// Shows a full grid of skeleton cards
// =========================================
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

// =========================================
// CATEGORY CARD SKELETON
// Matches the exact shape of a category card
// =========================================
export function CategoryCardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Skeleton className="aspect-square w-full rounded-2xl" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  )
}

// =========================================
// CATEGORIES GRID SKELETON
// =========================================
export function CategoriesGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <CategoryCardSkeleton key={i} />
      ))}
    </div>
  )
}