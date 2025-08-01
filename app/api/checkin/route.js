// app/api/checkin/route.js
import { NextResponse } from 'next/server'
import { connectDb } from '@/lib/db'
import Checkin from '@/models/Checkin'

export async function POST(req) {
  try {
    await connectDb()
    const body = await req.json()
    const { userEmail, items, signature } = body

    if (!userEmail || !items || !signature) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    const logement = items[0]?.logement || 'non-identifié'
    const doc = await Checkin.create({ logement, userEmail, items, signature })

    return NextResponse.json({ success: true, id: doc._id })
  } catch (err) {
    console.error('Erreur checkin :', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
