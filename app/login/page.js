'use client'

import { signIn, useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  if (session) {
    router.push(callbackUrl)
    return null
  }

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await signIn('email', {
      email,
      redirect: false,
      callbackUrl,
    })
    setLoading(false)
    if (res?.error) setError('Erreur lors de la connexion par email.')
    else setError(null)
  }

  const handleDevLogin = async () => {
    await signIn('credentials', {
      email: 'admin@test.local',
      password: 'admin',
      redirect: true,
      callbackUrl,
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-center">Se connecter</h1>

        <button
          onClick={() => signIn('google', { callbackUrl })}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Continuer avec Google
        </button>

        <div className="text-center text-sm text-gray-500">ou</div>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            {loading ? 'Envoi du lien...' : 'Recevoir un lien de connexion'}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={handleDevLogin}
            className="mt-4 text-sm text-gray-600 underline hover:text-gray-900"
          >
            🚧 Connexion rapide admin (dev only)
          </button>
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <div className="text-center mt-6">
          <Link href="/" className="text-blue-500 underline hover:text-blue-700">
            ← Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
