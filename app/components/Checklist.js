// components/Checklist.js
'use client'

import { useState } from 'react'
import { CameraIcon } from '@heroicons/react/24/outline'

export default function Checklist({ items = [], setItems = () => {} }) {
  const handleStatusChange = (index, status) => {
    const newItems = [...items]
    newItems[index].status = status
    setItems(newItems)
  }

  const handleCommentChange = (index, comment) => {
    const newItems = [...items]
    newItems[index].comment = comment
    setItems(newItems)
  }

  const handlePhotoChange = async (index, file) => {
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    const newItems = [...items]
    newItems[index].photoUrl = data.url
    setItems(newItems)
  }

  if (!Array.isArray(items)) {
    return <div className="text-red-500">Checklist invalide</div>
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item._id || index} className="border p-4 rounded shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">{item.nom}</span>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name={`status-${index}`}
                  checked={item.status === 'ok'}
                  onChange={() => handleStatusChange(index, 'ok')}
                />
                <span className="ml-1">OK</span>
              </label>
              <label>
                <input
                  type="radio"
                  name={`status-${index}`}
                  checked={item.status === 'not_ok'}
                  onChange={() => handleStatusChange(index, 'not_ok')}
                />
                <span className="ml-1">Pas OK</span>
              </label>
            </div>
          </div>

          {item.status === 'not_ok' && (
            <div className="mt-2 space-y-2">
              <textarea
                className="w-full border p-2 rounded"
                placeholder="Commentaire..."
                value={item.comment || ''}
                onChange={(e) => handleCommentChange(index, e.target.value)}
              />
              <label className="flex items-center gap-2">
                <CameraIcon className="h-5 w-5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoChange(index, e.target.files[0])}
                  className="hidden"
                />
                <span className="cursor-pointer">Ajouter une photo</span>
              </label>
              {item.photoUrl && (
                <img
                  src={item.photoUrl}
                  alt="photo-problème"
                  className="mt-2 w-32 h-auto rounded"
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
