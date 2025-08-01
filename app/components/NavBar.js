'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <Link href="/" className="text-lg font-bold">Checkin Inventaire</Link>
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <Link href="/checkin" className="hover:underline">Check-in</Link>
        <Link href="/checkout" className="hover:underline">Checkout</Link>
        {status === 'loading' ? (
          <span>…</span>
        ) : session ? (
          <>
            <span className="text-xs md:text-sm">{session.user.email}</span>
            <button onClick={() => signOut()} className="text-sm hover:underline text-red-400">Déconnexion</button>
          </>
        ) : (
          <Link href="/api/auth/signin" className="text-sm hover:underline">
            Connexion
          </Link>
        )}
      </div>
    </nav>
  )
}
