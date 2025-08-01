// models/InventoryItem.js
import mongoose from 'mongoose'

const InventoryItemSchema = new mongoose.Schema({
  logement: { type: String, required: true }, // code du logement concerné
  nom: { type: String, required: true },      // ex : "Télécommande TV"
  categorie: { type: String },                // ex : "Électronique", "Cuisine", etc.
  ordre: { type: Number },                    // pour afficher dans un ordre défini
}, {
  timestamps: true,
})

export default mongoose.models.InventoryItem || mongoose.model('InventoryItem', InventoryItemSchema)
