import Link from 'next/link'

const FOOTER_LINKS = {
  Shop: [
    { label: 'All Products', href: '/products' },
    { label: 'Categories', href: '/categories' },
    { label: 'New Arrivals', href: '/products?sort=newest' },
  ],
  Account: [
    { label: 'Login', href: '/login' },
    { label: 'Register', href: '/register' },
    { label: 'My Orders', href: '/account/orders' },
  ],
  Support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0b1329] text-gray-300 pt-16 pb-8">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 w-full text-center sm:text-left">

          {/* ── BRAND COLUMN ── */}
          <div className="flex flex-col gap-3">
            <h2 className="text-white text-2xl font-bold tracking-tight">
              Bazar
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your modern destination for quality products. Fast shipping, easy returns.
            </p>
          </div>

          {/* ── LINK GROUPS ── */}
          {Object.entries(FOOTER_LINKS).map(([groupName, links]) => (
            <div key={groupName} className="flex flex-col gap-4 sm:items-start items-center">
              <h3 className="text-white font-semibold text-lg tracking-wide">
                {groupName}
              </h3>
              <ul className="flex flex-col gap-3 text-sm">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-sky-400 hover:translate-x-1 inline-block transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
          <p className="text-gray-500 text-xs text-center">
            © {currentYear} Bazar. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}