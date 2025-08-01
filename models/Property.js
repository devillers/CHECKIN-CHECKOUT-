// models/Property.js
import mongoose from 'mongoose'

const PropertySchema = new mongoose.Schema({
  code: { type: String, required: true },
  nom: { type: String },
  adresse: { type: String },
  codePostal: { type: String },
  localite: { type: String },
  registre: { type: String }, // Numéro d’enregistrement
  logement: { type: String }, // Identifiant unique pour l’inventaire
  ownerId: { type: String },  // Lien vers l’owner
}, {
  timestamps: true,
})

export default mongoose.models.Property || mongoose.model('Property', PropertySchema)
