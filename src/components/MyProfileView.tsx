import React, { useState } from 'react';
import { useDirectory } from '../context/DirectoryContext';
import { ProfileCard } from './ProfileCard';
import {
  User,
  Building2,
  Star,
  Plus,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  ExternalLink,
  Share2,
  QrCode
} from 'lucide-react';

export const MyProfileView: React.FC = () => {
  const {
    myProfiles,
    profiles,
    setIsRegisterModalOpen,
    claimProfileWithPin,
    openShareModal,
    setActiveProfile
  } = useDirectory();

  const [claimBusinessName, setClaimBusinessName] = useState('');
  const [claimPin, setClaimPin] = useState('');
  const [claimMsg, setClaimMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimBusinessName.trim() || !claimPin.trim()) {
      setClaimMsg({ type: 'error', text: 'Por favor selecciona un negocio e ingresa tu PIN.' });
      return;
    }

    const target = profiles.find(
      (p) => p.businessName.toLowerCase() === claimBusinessName.toLowerCase() || p.id === claimBusinessName
    );

    if (!target) {
      setClaimMsg({ type: 'error', text: 'No se encontró ningún negocio con ese nombre.' });
      return;
    }

    const success = claimProfileWithPin(target.id, claimPin.trim());
    if (success) {
      setClaimMsg({ type: 'success', text: `¡Ficha de "${target.businessName}" vinculada exitosamente a tu perfil!` });
      setClaimBusinessName('');
      setClaimPin('');
    } else {
      setClaimMsg({ type: 'error', text: 'PIN incorrecto para este negocio.' });
    }
  };

  // Reviews received across my profiles
  const allMyReviews = myProfiles.flatMap((p) =>
    p.reviews.map((r) => ({ ...r, businessName: p.businessName }))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header banner */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#C8102E]/10 text-[#C8102E] flex items-center justify-center shrink-0 border border-[#C8102E]/20">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#2B2B2B]">
                Mi Perfil y Negocios
              </h2>
              <p className="text-xs text-[#2B2B2B]/70">
                Gestiona tus fichas registradas, edita tus datos y revisa los comentarios de vecinos.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            {myProfiles.length > 0 && (
              <button
                onClick={() => openShareModal({ type: 'profile', profile: myProfiles[0] })}
                className="flex items-center gap-1.5 bg-[#F5F5F5] hover:bg-stone-200 text-[#2B2B2B] font-bold text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 transition-colors shadow-2xs"
                title="Compartir tu negocio o descargar tu código QR"
              >
                <Share2 className="w-4 h-4 text-[#C8102E]" />
                <span>Compartir Ficha & QR</span>
              </button>
            )}

            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="flex items-center gap-2 bg-[#C8102E] hover:bg-[#8E1220] active:scale-98 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Registrar Nuevo Emprendimiento</span>
            </button>
          </div>
        </div>
      </div>

      {/* Promoción y Compartir para Emprendedores */}
      {myProfiles.length > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-amber-50/60 border border-[#C8102E]/20 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C8102E] text-white flex items-center justify-center shrink-0 shadow-xs">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#2B2B2B]">
                ¿Quieres más clientes y recomendaciones de vecinos?
              </h4>
              <p className="text-xs text-stone-600 mt-0.5 max-w-xl">
                Comparte tu ficha por WhatsApp o descarga tu código QR oficial para imprimirlo en tu local, mostrador o volantes publicitarios.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => openShareModal({ type: 'profile', profile: myProfiles[0] })}
              className="flex items-center gap-2 bg-[#C8102E] hover:bg-[#8E1220] text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Compartir con Clientes</span>
            </button>
          </div>
        </div>
      )}

      {/* Mis Negocios Registrados */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#2B2B2B] flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#C8102E]" />
            <span>Mis Fichas de Emprendimiento o Liderazgo ({myProfiles.length})</span>
          </h3>
          <span className="text-xs text-stone-500">
            {myProfiles.length === 1 ? '1 ficha activa' : `${myProfiles.length} fichas activas`}
          </span>
        </div>

        {myProfiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-stone-300 p-8 text-center max-w-lg mx-auto">
            <Building2 className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-[#2B2B2B]">
              Aún no tienes ningún negocio o ficha vinculada
            </h4>
            <p className="text-xs text-stone-500 mt-1 mb-4 leading-relaxed">
              Si acabas de registrar tu negocio aparecerá aquí automáticamente. También puedes vincular una ficha existente con tu PIN de 4 dígitos abajo.
            </p>
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="bg-[#C8102E] hover:bg-[#8E1220] text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Inscribir mi Negocio Ahora</span>
            </button>
          </div>
        )}
      </div>

      {/* Vincular Ficha con PIN */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#D4A62A] flex items-center justify-center shrink-0 border border-amber-200">
            <KeyRound className="w-5 h-5 text-[#C8102E]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#2B2B2B]">
              ¿Ya registraste tu negocio anteriormente? Vincúlalo con tu PIN
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              Si cambiaste de dispositivo o navegador, ingresa el nombre de tu emprendimiento y el PIN de 4 dígitos creado al registrarte para gestionarlo aquí.
            </p>
          </div>
        </div>

        {claimMsg && (
          <div
            className={`p-3 rounded-xl text-xs font-semibold mb-4 flex items-center gap-2 ${
              claimMsg.type === 'success'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'bg-red-100 text-red-900 border border-red-300'
            }`}
          >
            {claimMsg.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
            )}
            <span>{claimMsg.text}</span>
          </div>
        )}

        <form onSubmit={handleClaim} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#2B2B2B] mb-1">
              Nombre de tu Negocio / Emprendimiento
            </label>
            <input
              type="text"
              required
              value={claimBusinessName}
              onChange={(e) => setClaimBusinessName(e.target.value)}
              placeholder="Ej. Soda El Mirador o Taller Alvarado"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-[#2B2B2B] focus:outline-none focus:border-[#C8102E] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2B2B2B] mb-1">
              Tu PIN (4 dígitos)
            </label>
            <div className="flex gap-2">
              <input
                type="password"
                required
                maxLength={6}
                value={claimPin}
                onChange={(e) => setClaimPin(e.target.value)}
                placeholder="1234"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono tracking-widest text-[#2B2B2B] focus:outline-none focus:border-[#C8102E] focus:bg-white text-center"
              />
              <button
                type="submit"
                className="bg-[#C8102E] hover:bg-[#8E1220] text-white font-bold px-4 py-2 rounded-xl text-xs shrink-0 transition-colors"
              >
                Vincular
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Reseñas y Comentarios Recibidos */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h4 className="text-sm font-bold text-[#2B2B2B] flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#C8102E]" />
            <span>Opiniones y Calificaciones Recibidas ({allMyReviews.length})</span>
          </h4>
          <span className="text-xs text-stone-500">
            De clientes de la comunidad
          </span>
        </div>

        {allMyReviews.length > 0 ? (
          <div className="space-y-3">
            {allMyReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#2B2B2B]">{rev.author}</span>
                    <span className="text-[11px] text-stone-500">en</span>
                    <span className="font-semibold text-[#C8102E]">{rev.businessName}</span>
                  </div>

                  <div className="flex items-center gap-1 text-[#D4A62A]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= rev.rating ? 'fill-[#D4A62A]' : 'text-stone-300'
                        }`}
                      />
                    ))}
                    <span className="text-[10px] text-stone-400 ml-1">{rev.date}</span>
                  </div>
                </div>

                {rev.serviceRendered && (
                  <p className="text-[11px] text-stone-500">
                    Servicio: <strong className="text-stone-700">{rev.serviceRendered}</strong>
                  </p>
                )}

                <p className="text-stone-700 italic pt-0.5 leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-stone-500 text-center py-6 italic">
            Tus negocios aún no han recibido valoraciones. Comparte tu ficha por WhatsApp con tus clientes para recibir sus opiniones.
          </p>
        )}
      </div>
    </div>
  );
};
