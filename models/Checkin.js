// models/Checkin.js
import mongoose from 'mongoose'

const CheckinSchema = new mongoose.Schema({
  logement: { type: String, required: true }, // code du logement
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
  signature: { type: String }, // DataURL ou URL image
}, {
  timestamps: true,
})

export default mongoose.models.Checkin || mongoose.model('Checkin', CheckinSchema)
