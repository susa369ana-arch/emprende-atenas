import React, { useState } from 'react';
import { useDirectory } from '../context/DirectoryContext';
import { ChapterIcon } from './ChapterIcon';
import { cleanWhatsAppNumber } from '../utils/whatsapp';
import { X, CheckCircle2, AlertCircle, Plus, Sparkles, MapPin, Phone, Briefcase, Clock, ShieldCheck } from 'lucide-react';

// Preset photographic samples by trade to make self-registration easy and visually stunning
const PRESET_PHOTOS_BY_CHAPTER: Record<string, { avatar: string; sampleImages: string[] }> = {
  'pinta-carros': {
    avatar: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=400&q=80',
    sampleImages: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=800&q=80'
    ]
  },
  'albaniles': {
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    sampleImages: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
    ]
  },
  'pintores': {
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    sampleImages: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80'
    ]
  },
  'tiendas': {
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    sampleImages: [
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=800&q=80'
    ]
  },
  'sodas': {
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    sampleImages: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
    ]
  },
  'artesanos': {
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    sampleImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80'
    ]
  },
  default: {
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    sampleImages: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
    ]
  }
};

export const RegisterModal: React.FC = () => {
  const {
    isRegisterModalOpen,
    setIsRegisterModalOpen,
    chapters,
    selectedChapterId,
    addProfile,
    setSelectedChapterId
  } = useDirectory();

  // Form State
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [chapterId, setChapterId] = useState(
    selectedChapterId !== 'all' ? selectedChapterId : (chapters[0]?.id || 'pinta-carros')
  );
  const [jobTitle, setJobTitle] = useState('');
  const [specialtiesRaw, setSpecialtiesRaw] = useState('');
  const [locality, setLocality] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [schedule, setSchedule] = useState('Lunes a Sábado: 7:00 AM - 5:00 PM');
  const [experienceYears, setExperienceYears] = useState(5);
  const [pricingNote, setPricingNote] = useState('Cotización y presupuesto previo sin compromiso');
  const [description, setDescription] = useState('');
  const [customAvatar, setCustomAvatar] = useState('');
  const [customPhoto1, setCustomPhoto1] = useState('');
  const [customPhoto2, setCustomPhoto2] = useState('');
  const [pin, setPin] = useState('1234');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isRegisterModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !businessName.trim()) {
      setErrorMsg('Por favor ingresa tu nombre y el nombre de tu emprendimiento o taller.');
      return;
    }

    if (!jobTitle.trim()) {
      setErrorMsg('Por favor especifica claramente a qué te dedicas.');
      return;
    }

    if (!address.trim() || !locality.trim()) {
      setErrorMsg('La dirección y zona son necesarias para que los clientes puedan encontrarte.');
      return;
    }

    if (!phone.trim()) {
      setErrorMsg('Por favor indica un teléfono de contacto.');
      return;
    }

    const preset = PRESET_PHOTOS_BY_CHAPTER[chapterId] || PRESET_PHOTOS_BY_CHAPTER.default;

    const portfolioImages: string[] = [];
    if (customPhoto1.trim()) portfolioImages.push(customPhoto1.trim());
    if (customPhoto2.trim()) portfolioImages.push(customPhoto2.trim());
    if (portfolioImages.length === 0) {
      portfolioImages.push(...preset.sampleImages);
    }

    const specialties = specialtiesRaw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    addProfile({
      name: name.trim(),
      businessName: businessName.trim(),
      chapterId,
      jobTitle: jobTitle.trim(),
      specialties: specialties.length > 0 ? specialties : ['Atención personalizada', 'Trabajos garantizados'],
      address: address.trim(),
      locality: locality.trim(),
      phone: phone.trim(),
      whatsapp: whatsapp.trim() || phone.replace(/\D/g, ''),
      schedule: schedule.trim() || 'Lunes a Sábado: 8:00 AM - 5:00 PM',
      experienceYears: Number(experienceYears) || 1,
      pricingNote: pricingNote.trim(),
      description: description.trim() || `Servicio responsable en ${locality}. Garantía y experiencia comprobada.`,
      avatarUrl: customAvatar.trim() || preset.avatar,
      portfolioImages,
      isAvailable: true,
      pin: pin.trim() || '1234'
    });

    setSelectedChapterId(chapterId);
    setIsRegisterModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-stone-200 my-8 text-stone-900 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Official Shield Logo */}
        <div className="bg-[#C8102E] text-white px-6 py-5 flex items-center justify-between border-b border-[#8E1220]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/80 shrink-0 bg-white shadow-xs">
              <img
                src="/assets/aistudio/IMG-20261104-WA0003_849a84ef.jpg"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                Registra tu Negocio o Liderazgo Comunal
              </h2>
              <p className="text-xs text-white/90 mt-0.5">
                Publica a qué te dedicas o tu rol comunitario, tu dirección exacta y teléfono.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsRegisterModalOpen(false)}
            className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(90vh-10rem)] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-red-100 border border-red-300 text-red-900 rounded-lg text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
              {errorMsg}
            </div>
          )}

          {/* Bloque 1: Identificación y Capítulo */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-200 pb-1">
              <span>1. Identificación y Capítulo</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Tu Nombre y Apellidos *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Don Carlos Alvarado"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Nombre Comercial / Emprendimiento *
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Ej. Taller & Enderezado Alvarado"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>
            </div>

            {/* Chapter Selection */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Capítulo / Categoría de Trabajo *
              </label>
              <select
                value={chapterId}
                onChange={(e) => setChapterId(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
              >
                {chapters.map((ch) => (
                  <option key={ch.id} value={ch.id}>
                    {ch.name} ({ch.shortName})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bloque 2: Oficio y Dedicación */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-200 pb-1">
              <span>2. ¿A qué te dedicas?</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Trabajo u oficio específico (Título de lo que haces) *
              </label>
              <input
                type="text"
                required
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Ej. Pintor de carros con cabina / Maestro de obra albañil / Soda típica con almuerzos"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Especialidades o servicios clave (separados por comas)
              </label>
              <input
                type="text"
                value={specialtiesRaw}
                onChange={(e) => setSpecialtiesRaw(e.target.value)}
                placeholder="Ej. Pintura al horno, Enderezado, Pulido 3M, Retoques express"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Descripción detallada de tus servicios, garantía y experiencia
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explica qué tipo de trabajos realizas, si das garantía por escrito, métodos de trabajo o calidad de tus materiales..."
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Bloque 3: Dirección y Ubicación */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-200 pb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>3. Dirección y Ubicación Exacta</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Zona / Cantón / Barrio *
                </label>
                <input
                  type="text"
                  required
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="Ej. Santa Teresita, San José, Cartago, etc."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Años de Experiencia en el oficio
                </label>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Dirección exacta con señas y referencias *
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ej. Del cruce principal 200m este, frente al abastecedor, portón verde"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Bloque 4: Contacto y Horarios */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-200 pb-1">
              <Phone className="w-3.5 h-3.5" />
              <span>4. Contacto, Horario y Precios</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Teléfono / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (!whatsapp) setWhatsapp(e.target.value);
                  }}
                  placeholder="Ej. 8888-8888 o 8841 2390"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
                <span className="text-[10px] text-stone-500 mt-0.5 block">
                  Puedes escribirlo con guiones o espacios
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Número Limpio para WhatsApp (Fórmula M2)
                </label>
                <div className="px-3 py-2 bg-stone-100 border border-stone-200 rounded-lg text-xs font-mono font-bold text-emerald-800 flex items-center justify-between">
                  <span>{phone ? cleanWhatsAppNumber(whatsapp || phone) : '506...'}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-sans font-semibold">
                    Automático
                  </span>
                </div>
                <span className="text-[10px] text-stone-500 mt-0.5 block">
                  Se añade código +506 y se limpian guiones
                </span>
              </div>
            </div>

            {/* Live WhatsApp message preview */}
            {phone && (
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-[11px] text-emerald-950">
                <span className="font-bold block mb-0.5 text-emerald-900">
                  Vista previa del mensaje automático que recibirás de clientes:
                </span>
                <p className="italic text-emerald-800 font-mono text-[10.5px]">
                  "Hola, vi *{businessName || 'Tu Negocio'}* en la app MiBarrio y quisiera consultar sobre sus servicios."
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Horario habitual de atención
                </label>
                <input
                  type="text"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  placeholder="Ej. Lunes a Sábado: 7:00 AM - 5:00 PM"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Presupuesto / Condiciones de pago
                </label>
                <input
                  type="text"
                  value={pricingNote}
                  onChange={(e) => setPricingNote(e.target.value)}
                  placeholder="Ej. Cotización sin compromiso / Acepta SINPE Móvil"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>
            </div>

            {/* PIN for editing later */}
            <div className="bg-amber-50/60 p-3 rounded-lg border border-amber-200/80">
              <label className="block text-xs font-bold text-stone-900 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                PIN de 4 dígitos para editar tu ficha después
              </label>
              <input
                type="password"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="1234"
                className="w-32 px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 font-mono tracking-widest focus:outline-none focus:border-amber-500"
              />
              <p className="text-[11px] text-stone-600 mt-1">
                Guarda este número para poder actualizar tu dirección o teléfono en el futuro.
              </p>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsRegisterModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#C8102E] hover:bg-[#8E1220] active:scale-95 text-white font-bold rounded-xl text-xs shadow-sm transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Publicar Ficha en el Directorio</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
