// app/components/ServiceWorkerRegister.js
'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then((registration) => {
            console.log('SW enregistré :', registration)
          })
          .catch((err) => {
            console.error('Erreur SW :', err)
          })
      })
    }
  }, [])

  return null
}
