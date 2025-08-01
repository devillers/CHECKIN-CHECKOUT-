// app/api/upload/route.js
import { NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'

export async function POST(req) {
  try {
    const formData = await req.formData()
    const file = formData.get('file')
    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

    const result = await cloudinary.uploader.upload(base64, {
      folder: 'checkin-inventaire',
    })

    return NextResponse.json({ url: result.secure_url })
  } catch (err) {
    console.error('Erreur upload :', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
