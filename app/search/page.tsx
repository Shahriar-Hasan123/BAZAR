import Link from 'next/link'
import { getProducts } from '@/services/products'
import ProductCard from '@/components/ui/ProductCard'
import SearchInput from '@/features/search/SearchInput'
import type { Metadata } from 'next'

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams
  return {
    title: q ? `Search: ${q}` : 'Search',
    description: q ? `Search results for "${q}"` : 'Search our products',
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const query = q?.trim() || ''

  const products = query
    ? await getProducts({ title: query, limit: 20, offset: 0 })
    : []

  return (
    <div className="min-h-screen bg-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* ── HEADER ── */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-base mb-6">
            Search
          </h1>

          {/* Search input */}
          <SearchInput initialValue={query} />
        </div>

        {/* ── RESULTS ── */}
        {query ? (
          <>
            <p className="text-subtle text-sm mb-6">
              {products.length > 0
                ? `${products.length} results for "${query}"`
                : `No results for "${query}"`}
            </p>

            {products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <EmptySearchState query={query} />
            )}
          </>
        ) : (
          <EmptySearchPrompt />
        )}

      </div>
    </div>
  )
}

function EmptySearchState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-subtle">
        <SearchIcon />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-base">
        No results found
      </h3>

      <p className="mb-6 text-sm text-subtle">
        We couldn&apos;t find anything for &ldquo;{query}&rdquo;. Try a different term.
      </p>

      <Link
        href="/products"
        className="rounded-xl bg-blue-600 px-6 mt-3 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
      >
        Browse All Products
      </Link>
    </div>
  )
}

function EmptySearchPrompt() {
  return (
    <div className="text-center py-20">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <SearchIcon className="text-blue-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        What are you looking for?
      </h3>
      <p className="text-gray-500 text-sm">
        Type something above to search our products.
      </p>
    </div>
  )
}

function SearchIcon({ className = 'text-gray-400' }: { className?: string }) {
  return (
    <svg className={`w-7 h-7 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}