'use client';

import { useState } from 'react';
import Image from 'next/image';
import SignaturePad from '../components/SignaturePad';
import Checklist from '../components/Checklist';
import InventoryForm from '../components/InventoryForm';
import { toast } from 'sonner';
import axios from 'axios';

export default function CheckinPage() {
  const [form, setForm] = useState({
    guestName: '',
    propertyId: '',
    date: new Date().toISOString().split('T')[0],
    photos: [],
    signature: '',
    checklist: {},
    notes: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const { data } = await axios.post('/api/upload', formData);
      setForm((prev) => ({
        ...prev,
        photos: [...prev.photos, data.secure_url],
      }));
      toast.success('Image uploaded');
    } catch (err) {
      toast.error('Erreur upload');
    } finally {
      setLoading(false);
    }
  };

  const handleSignature = (dataUrl) => {
    setForm({ ...form, signature: dataUrl });
  };

  const handleChecklistChange = (newChecklist) => {
    setForm({ ...form, checklist: newChecklist });
  };

  const handleSubmit = async () => {
    if (!form.guestName || !form.propertyId || !form.signature) {
      return toast.error('Champs obligatoires manquants');
    }

    try {
      setLoading(true);
      await axios.post('/api/checkin', form);
      toast.success('Check-in enregistré !');
      setForm({
        guestName: '',
        propertyId: '',
        date: new Date().toISOString().split('T')[0],
        photos: [],
        signature: '',
        checklist: {},
        notes: '',
      });
    } catch (error) {
      toast.error('Erreur lors de l’enregistrement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Check-in invité</h1>

      <div className="mb-4">
        <label className="block font-medium">Nom du locataire</label>
        <input
          type="text"
          name="guestName"
          value={form.guestName}
          onChange={handleChange}
          className="input"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Référence logement</label>
        <input
          type="text"
          name="propertyId"
          value={form.propertyId}
          onChange={handleChange}
          className="input"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Photos (état des lieux)</label>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        <div className="flex gap-2 mt-2">
          {form.photos.map((url, i) => (
            <Image
              key={i}
              src={url}
              alt={`photo-${i}`}
              width={100}
              height={100}
              className="rounded"
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <Checklist onChange={handleChecklistChange} />
      </div>

      <div className="mb-4">
        <InventoryForm onChange={(val) => setForm({ ...form, notes: val })} />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Signature locataire</label>
        <SignaturePad onSave={handleSignature} />
        {form.signature && (
          <img src={form.signature} alt="signature" className="mt-2 w-48" />
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Enregistrement...' : 'Valider le check-in'}
      </button>
    </div>
  );
}
