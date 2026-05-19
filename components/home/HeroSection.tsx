import Image from 'next/image'

export default function HeroSection() {
    return (
        <section className="w-full flex items-center justify-center py-4 md:py-8 lg:py-12">
            <div className="w-full max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8">
                <div className="relative w-full rounded-lg sm:rounded-xl overflow-hidden h-40 sm:h-56 md:h-64 lg:h-72 shadow-md hover:shadow-lg transition-shadow">
                    <Image
                        src="/hero.jpg"
                        alt="Bazar banner"
                        fill
                        priority
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 90vw"
                        className="object-cover"
                    />
                </div>
            </div>
        </section>
    )
}