'use client'

import { useState } from 'react'
import Image from 'next/image'
import { getSafeImageUrl } from '@/utils/image'

interface ProductGalleryProps {
  images: string[]
  title: string
}

export default function ProductGallery({
  images,
  title,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Clean and validate all images
  const safeImages = images
    .map((img) => getSafeImageUrl(img))
    .filter(Boolean)

  // Fallback if no valid images
  if (safeImages.length === 0) {
    safeImages.push(getSafeImageUrl(undefined))
  }

  const selectedImage = safeImages[selectedIndex]

  return (
    <div className="space-y-4">

      {/* ── MAIN IMAGE ── */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-subtle">
        <Image
          src={selectedImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {/* ── THUMBNAILS ── */}
      {/* Only show if more than 1 image */}
      {safeImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {safeImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                selectedIndex === index
                  ? 'border-blue-600'
                  : 'border-base hover:border-base'
              }`}
            >
              <Image
                src={image}
                alt={`${title} image ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

    </div>
  )
}