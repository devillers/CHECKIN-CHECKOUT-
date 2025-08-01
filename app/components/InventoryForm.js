// components/InventoryForm.js
'use client'

import { useEffect, useState } from 'react'
import Checklist from './Checklist'
import SignaturePad from './SignaturePad'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function InventoryForm({ mode, user }) {
  const [items, setItems] = useState([])
  const [signature, setSignature] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch('/api/properties/items')
        const data = await res.json()
        setItems(data)
      } catch (error) {
        toast.error('Erreur chargement des éléments')
      }
    }
    fetchItems()
  }, [])

  const handleSubmit = async () => {
    if (!signature) {
      toast.error('Merci de signer avant de valider.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`/api/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: user.email,
          items,
          signature,
        }),
      })

      if (res.ok) {
        toast.success(`${mode === 'checkin' ? 'Check-in' : 'Checkout'} enregistré`)
        router.push('/dashboard')
      } else {
        const err = await res.json()
        toast.error(err.error || 'Erreur serveur')
      }
    } catch (error) {
      toast.error('Échec de l’envoi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Checklist items={items} setItems={setItems} />
      <SignaturePad setSignature={setSignature} />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Envoi en cours...' : 'Valider l’inventaire'}
      </button>
    </div>
  )
}
