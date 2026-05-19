import { ProductGridSkeleton } from '@/components/ui/Skeletons'

export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="mb-8">
          <div className="h-9 w-48 bg-gray-200 rounded-lg animate-pulse mb-2" />
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-32 w-full bg-gray-200 rounded-2xl animate-pulse mb-8" />
        <ProductGridSkeleton count={12} />
      </div>
    </div>
  )
}