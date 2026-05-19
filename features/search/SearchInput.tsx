'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDebounce } from '@/hooks/useDebounce'
import { useEffect } from 'react'

interface SearchInputProps {
  initialValue?: string
}

export default function SearchInput({ initialValue = '' }: SearchInputProps) {
  const router = useRouter()
  const [value, setValue] = useState(initialValue)
  const debounced = useDebounce(value, 500)

  useEffect(() => {
    if (debounced.trim()) {
      router.push(`/search?q=${encodeURIComponent(debounced.trim())}`)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  return (
    <div className="relative max-w-2xl">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <SearchIcon />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products..."
        autoFocus
        className="w-full pl-11 pr-10 py-4 rounded-2xl border border-base bg-base text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
      />
      {value && (
        <button
          onClick={() => {
            setValue('')
            router.push('/search')
          }}
          className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  )
}

function SearchIcon() {
  return (
    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}