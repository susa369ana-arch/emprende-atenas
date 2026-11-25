import React, { useState, useEffect } from 'react';
import { useDirectory } from '../context/DirectoryContext';
import { cleanWhatsAppNumber } from '../utils/whatsapp';
import { X, CheckCircle2, AlertCircle, Save, ShieldCheck } from 'lucide-react';

export const EditProfileModal: React.FC = () => {
  const {
    isEditModalOpen,
    setIsEditModalOpen,
    editingProfile,
    setEditingProfile,
    updateProfile,
    chapters
  } = useDirectory();

  const [pinInput, setPinInput] = useState('');
  const [pinVerified, setPinVerified] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Editable fields
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [chapterId, setChapterId] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [specialtiesRaw, setSpecialtiesRaw] = useState('');
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [schedule, setSchedule] = useState('');
  const [experienceYears, setExperienceYears] = useState(1);
  const [pricingNote, setPricingNote] = useState('');
  const [description, setDescription] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    if (editingProfile) {
      setName(editingProfile.name);
      setBusinessName(editingProfile.businessName);
      setChapterId(editingProfile.chapterId);
      setJobTitle(editingProfile.jobTitle);
      setSpecialtiesRaw(editingProfile.specialties?.join(', ') || '');
      setAddress(editingProfile.address);
      setLocality(editingProfile.locality);
      setPhone(editingProfile.phone);
      setWhatsapp(editingProfile.whatsapp);
      setSchedule(editingProfile.schedule);
      setExperienceYears(editingProfile.experienceYears);
      setPricingNote(editingProfile.pricingNote || '');
      setDescription(editingProfile.description);
      setIsAvailable(editingProfile.isAvailable);
      setPinVerified(!editingProfile.pin); // if no pin, auto verified
      setPinInput('');
      setErrorMsg('');
    }
  }, [editingProfile]);

  if (!isEditModalOpen || !editingProfile) return null;

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProfile.pin && pinInput.trim() !== editingProfile.pin) {
      setErrorMsg('PIN incorrecto. Ingresa el PIN con el que registraste este perfil.');
      return;
    }
    setPinVerified(true);
    setErrorMsg('');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const specialties = specialtiesRaw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    updateProfile(editingProfile.id, {
      name: name.trim(),
      businessName: businessName.trim(),
      chapterId,
      jobTitle: jobTitle.trim(),
      specialties,
      address: address.trim(),
      locality: locality.trim(),
      phone: phone.trim(),
      whatsapp: whatsapp.trim() || phone.replace(/\D/g, ''),
      schedule: schedule.trim(),
      experienceYears: Number(experienceYears) || 1,
      pricingNote: pricingNote.trim(),
      description: description.trim(),
      isAvailable
    });

    setIsEditModalOpen(false);
    setEditingProfile(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div
        className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-stone-200 my-8 text-stone-900 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#C8102E] text-white px-6 py-4 flex items-center justify-between border-b border-[#8E1220]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/80 shrink-0 bg-white">
              <img
                src="/assets/aistudio/IMG-20261104-WA0003_849a84ef.jpg"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                Editar Ficha de Negocio o Líder Comunal
              </h2>
              <p className="text-xs text-white/90">
                {editingProfile.businessName} · {editingProfile.name}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsEditModalOpen(false);
              setEditingProfile(null);
            }}
            className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN protection step if required */}
        {!pinVerified ? (
          <form onSubmit={handleVerifyPin} className="p-6 space-y-4">
            <div className="text-center max-w-sm mx-auto py-4">
              <ShieldCheck className="w-10 h-10 text-[#C8102E] mx-auto mb-2" />
              <h3 className="text-sm font-bold text-[#2B2B2B]">
                Verificación de Seguridad
              </h3>
              <p className="text-xs text-stone-500 mt-1 mb-4">
                Ingresa el PIN de 4 dígitos creado al registrar esta ficha para continuar:
              </p>

              {errorMsg && (
                <div className="mb-3 p-2 bg-red-100 text-red-800 rounded-xl text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              <input
                type="password"
                required
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="PIN (ej: 1234)"
                className="w-40 mx-auto px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm text-center font-mono tracking-widest block focus:outline-none focus:border-[#C8102E] mb-4"
              />

              <div className="flex justify-center gap-2">
                <button
                  type="submit"
                  className="bg-[#C8102E] hover:bg-[#8E1220] active:scale-95 text-white font-bold px-5 py-2 rounded-xl text-xs transition-colors"
                >
                  Continuar
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-stone-500 hover:text-stone-800 px-3 py-2 text-xs"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Edit Form */
          <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[calc(90vh-10rem)] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nombre del Emprendedor
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nombre Comercial / Taller
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Capítulo / Categoría
              </label>
              <select
                value={chapterId}
                onChange={(e) => setChapterId(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium"
              >
                {chapters.map((ch) => (
                  <option key={ch.id} value={ch.id}>
                    {ch.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                A qué se dedica (Especialidad principal)
              </label>
              <input
                type="text"
                required
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Dirección exacta con señas
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Zona / Cantón
                </label>
                <input
                  type="text"
                  required
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Teléfono / WhatsApp
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="ej. 8888-8888"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
                <span className="text-[10px] text-emerald-800 font-mono mt-0.5 block">
                  Limpio: {cleanWhatsAppNumber(phone)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Horario de atención
                </label>
                <input
                  type="text"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2 text-xs font-semibold text-stone-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAvailable}
                    onChange={(e) => setIsAvailable(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-600"
                  />
                  <span>Disponible para recibir nuevos trabajos</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Descripción del servicio
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
              />
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-3 py-2 text-xs text-stone-600 hover:text-stone-900"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 bg-[#C8102E] hover:bg-[#8E1220] active:scale-95 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
