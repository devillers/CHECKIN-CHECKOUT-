// components/SignaturePad.js
'use client'

import { useRef } from 'react'
import SignatureCanvas from 'react-signature-canvas'

export default function SignaturePad({ setSignature }) {
  const sigCanvas = useRef(null)

  const clearSignature = () => {
    sigCanvas.current.clear()
    setSignature(null)
  }

  const saveSignature = () => {
    if (sigCanvas.current.isEmpty()) {
      alert('Veuillez signer avant de sauvegarder.')
      return
    }
    const dataURL = sigCanvas.current.toDataURL()
    setSignature(dataURL)
  }

  return (
    <div className="border p-4 rounded shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Signature</h2>
      <SignatureCanvas
        penColor="black"
        canvasProps={{
          width: 400,
          height: 200,
          className: 'border border-gray-300 rounded',
        }}
        ref={sigCanvas}
      />
      <div className="mt-2 flex gap-4">
        <button
          onClick={clearSignature}
          className="bg-gray-300 px-4 py-1 rounded"
        >
          Effacer
        </button>
        <button
          onClick={saveSignature}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Sauvegarder
        </button>
      </div>
    </div>
  )
}
