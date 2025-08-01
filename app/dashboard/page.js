// app/dashboard/page.js
'use client'

import { useSession } from 'next-auth/react'

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <p className="text-center mt-10">Chargement...</p>
  }

  if (!session) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold mb-2">Accès refusé</h2>
        <p>Vous devez être connecté pour accéder au dashboard.</p>
      </div>
    )
  }

  return (
    <div className="mt-10 px-4">
      <h1 className="text-3xl font-bold mb-4">Bienvenue, {session.user.name || session.user.email}</h1>
      <p className="text-lg text-gray-700">
        Ce dashboard vous permet de gérer les propriétés, les check-ins, les checkouts, et l’inventaire.
      </p>
    </div>
  )
}
