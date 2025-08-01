// app/api/properties/items/route.js
import { NextResponse } from 'next/server'
import { connectDb } from '@/lib/db'
import InventoryItem from '@/models/InventoryItem'

export async function GET() {
  try {
    await connectDb()
    const items = await InventoryItem.find({}).sort({ ordre: 1 }).lean()
    return NextResponse.json(items)
  } catch (err) {
    console.error('Erreur chargement inventaire :', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
