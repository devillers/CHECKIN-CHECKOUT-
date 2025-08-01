
// app/checkout/page.js
'use client'

import InventoryForm from '../components/InventoryForm'
import { useSession } from 'next-auth/react'

export default function CheckoutPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <p className="text-center mt-10">Chargement...</p>
  }

  if (!session) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold mb-2">Accès refusé</h2>
        <p>Vous devez être connecté pour effectuer un checkout.</p>
      </div>
    )
  }

  return (
    <div className="mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Checkout - Vérification de sortie</h1>
      <InventoryForm mode="checkout" user={session.user} />
    </div>
  )
}
