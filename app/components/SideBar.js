// components/Sidebar.js
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/checkin', label: 'Check-in' },
    { href: '/checkout', label: 'Checkout' },
  ]

  return (
    <aside className="w-48 bg-gray-100 p-4 h-screen border-r">
      <nav className="flex flex-col gap-3">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`px-2 py-1 rounded ${
              pathname === href ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
