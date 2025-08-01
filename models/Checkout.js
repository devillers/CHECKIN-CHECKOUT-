// models/Checkout.js
import mongoose from 'mongoose'

const CheckoutSchema = new mongoose.Schema({
  logement: { type: String, required: true },
  userEmail: { type: String, required: true },
  date: { type: Date, default: Date.now },
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem' },
      status: { type: String, enum: ['ok', 'not_ok'], default: 'ok' },
      comment: { type: String },
      photoUrl: { type: String },
    },
  ],
  signature: { type: String }, // image encodée en base64 ou URL
}, {
  timestamps: true,
})

export default mongoose.models.Checkout || mongoose.model('Checkout', CheckoutSchema)
