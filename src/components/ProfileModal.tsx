import React, { useState } from 'react';
import { useDirectory } from '../context/DirectoryContext';
import { ChapterIcon } from './ChapterIcon';
import { buildWhatsAppLink } from '../utils/whatsapp';
import {
  X,
  MapPin,
  Phone,
  MessageCircle,
  Star,
  Clock,
  Award,
  CheckCircle2,
  Share2,
  ThumbsUp,
  Send,
  Calendar,
  AlertCircle,
  Building,
  Edit,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';

export const ProfileModal: React.FC = () => {
  const {
    activeProfile,
    setActiveProfile,
    chapters,
    addReview,
    toggleHelpfulReview,
    setEditingProfile,
    setIsEditModalOpen,
    openShareModal,
    deleteProfile
  } = useDirectory();

  // Review Form States
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [serviceRendered, setServiceRendered] = useState('');
  const [comment, setComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePinInput, setDeletePinInput] = useState('');
  const [deleteError, setDeleteError] = useState('');

  if (!activeProfile) return null;

  const chapter = chapters.find((c) => c.id === activeProfile.chapterId);

  // Compute rating metrics
  const totalReviews = activeProfile.reviews.length;
  const avgRating =
    totalReviews > 0
      ? (activeProfile.reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
      : '5.0';

  const ratingCounts = {
    5: activeProfile.reviews.filter((r) => r.rating === 5).length,
    4: activeProfile.reviews.filter((r) => r.rating === 4).length,
    3: activeProfile.reviews.filter((r) => r.rating === 3).length,
    2: activeProfile.reviews.filter((r) => r.rating === 2).length,
    1: activeProfile.reviews.filter((r) => r.rating === 1).length
  };

  const handleWhatsApp = () => {
    const { fullUrl } = buildWhatsAppLink(
      activeProfile.phone,
      activeProfile.businessName,
      '506',
      activeProfile.jobTitle
    );
    if (fullUrl) {
      window.open(fullUrl, '_blank');
    }
  };

  const handleCall = () => {
    window.open(`tel:${activeProfile.phone}`, '_self');
  };

  const handleShare = () => {
    openShareModal({ type: 'profile', profile: activeProfile });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim()) {
      setReviewError('Por favor escribe tu nombre');
      return;
    }
    if (!comment.trim()) {
      setReviewError('Por favor escribe un comentario sobre el trabajo o atención');
      return;
    }

    addReview(activeProfile.id, {
      author: author.trim(),
      rating,
      comment: comment.trim(),
      serviceRendered: serviceRendered.trim() || undefined
    });

    setAuthor('');
    setComment('');
    setServiceRendered('');
    setRating(5);
    setReviewError('');
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  const handleDeleteWithPin = () => {
    if (activeProfile.pin && deletePinInput !== activeProfile.pin) {
      setDeleteError('El PIN ingresado es incorrecto.');
      return;
    }
    deleteProfile(activeProfile.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-stone-200 my-8 text-stone-900 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveProfile(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white transition-colors"
          title="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner with Photo */}
        <div className="relative h-60 sm:h-72 bg-stone-900">
          <img
            src={activeProfile.portfolioImages[0] || activeProfile.avatarUrl}
            alt={activeProfile.businessName}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />

          {/* Hero Overlay Info */}
          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <img
                src={activeProfile.avatarUrl}
                alt={activeProfile.name}
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl border-3 border-white object-cover shadow-lg shrink-0"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {chapter && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-semibold bg-stone-900/70 backdrop-blur-xs px-2.5 py-0.5 rounded">
                      <ChapterIcon name={chapter.icon} className="w-3.5 h-3.5" />
                      {chapter.name}
                    </span>
                  )}
                  {activeProfile.isAvailable && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-300 bg-emerald-950/70 px-2 py-0.5 rounded font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Disponible para trabajos
                    </span>
                  )}
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
                  {activeProfile.businessName}
                </h1>
                <p className="text-xs sm:text-sm text-stone-200 font-medium">
                  Atendido por: {activeProfile.name}
                </p>
              </div>
            </div>

            {/* Quick Actions (WhatsApp in RED & Call) */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 bg-[#C8102E] hover:bg-[#8E1220] active:scale-95 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all border border-white/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Escribir por WhatsApp</span>
              </button>
              <button
                onClick={handleCall}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors border border-white/20"
              >
                <Phone className="w-4 h-4" />
                <span>Llamar</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white font-semibold px-3 py-2.5 rounded-xl text-xs sm:text-sm transition-colors border border-white/20"
                title="Compartir ficha por WhatsApp, QR o enlace"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Compartir</span>
              </button>
            </div>
          </div>
        </div>

        {/* Copied alert */}
        {copiedShare && (
          <div className="bg-amber-100 text-amber-900 text-xs py-1.5 text-center font-medium">
            ¡Enlace copiado al portapapeles!
          </div>
        )}

        {/* Modal Main Content Container */}
        <div className="p-5 sm:p-7 space-y-8 max-h-[calc(90vh-18rem)] overflow-y-auto">
          {/* Section 1: Overview and Contact bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left 2 Cols: Trade details & description */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <h2 className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                  ¿A qué se dedica?
                </h2>
                <p className="text-base sm:text-lg font-semibold text-stone-900 mt-1">
                  {activeProfile.jobTitle}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                  Descripción y Garantía del Servicio
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                  {activeProfile.description}
                </p>
              </div>

              {/* Specialties tags */}
              {activeProfile.specialties && activeProfile.specialties.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                    Especialidades & Servicios Principales
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activeProfile.specialties.map((spec, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-stone-100 border border-stone-200/80 text-stone-800 px-2.5 py-1 rounded-md"
                      >
                        ✓ {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right 1 Col: Location, Schedule, Experience card */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 sm:p-5 space-y-4 text-xs">
              {/* Dirección */}
              <div>
                <span className="flex items-center gap-1.5 font-bold text-stone-900 text-sm mb-1">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  Dirección & Ubicación
                </span>
                <p className="font-semibold text-stone-900">
                  {activeProfile.locality}
                </p>
                <p className="text-stone-600 mt-0.5 leading-normal">
                  {activeProfile.address}
                </p>
              </div>

              {/* Horario */}
              <div className="pt-3 border-t border-stone-200/70">
                <span className="flex items-center gap-1.5 font-bold text-stone-900 mb-1">
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  Horario de Atención
                </span>
                <p className="text-stone-600 leading-normal">
                  {activeProfile.schedule}
                </p>
              </div>

              {/* Experiencia */}
              <div className="pt-3 border-t border-stone-200/70">
                <span className="flex items-center gap-1.5 font-bold text-stone-900 mb-1">
                  <Award className="w-3.5 h-3.5 text-stone-500" />
                  Trayectoria
                </span>
                <p className="text-stone-600">
                  {activeProfile.experienceYears} años de experiencia en el oficio
                </p>
              </div>

              {/* Cotización */}
              {activeProfile.pricingNote && (
                <div className="pt-3 border-t border-stone-200/70">
                  <span className="font-bold text-stone-900 block mb-0.5">
                    Condiciones de Pago / Cotización
                  </span>
                  <p className="text-stone-600">
                    {activeProfile.pricingNote}
                  </p>
                </div>
              )}

              {/* Edit / Delete profile triggers */}
              <div className="pt-3 border-t border-stone-200/70 flex items-center justify-between text-stone-500">
                <button
                  onClick={() => {
                    setEditingProfile(activeProfile);
                    setIsEditModalOpen(true);
                  }}
                  className="hover:text-stone-900 font-medium flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Editar ficha</span>
                </button>

                <button
                  onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
                  className="hover:text-red-600 text-stone-400 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Eliminar</span>
                </button>
              </div>

              {/* Delete confirmation box */}
              {showDeleteConfirm && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 space-y-2">
                  <p className="text-[11px] text-red-900 font-medium">
                    ¿Confirmas eliminar esta ficha? Si definiste un PIN, ingrésalo:
                  </p>
                  <input
                    type="password"
                    maxLength={6}
                    value={deletePinInput}
                    onChange={(e) => setDeletePinInput(e.target.value)}
                    placeholder="PIN (ej: 1234)"
                    className="w-full px-2 py-1 bg-white border border-red-300 rounded text-xs"
                  />
                  {deleteError && (
                    <p className="text-[10px] text-red-600 font-semibold">{deleteError}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={handleDeleteWithPin}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold px-2 py-1 rounded text-xs"
                    >
                      Sí, eliminar
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="text-stone-600 hover:text-stone-900 text-xs"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Portfolio Gallery */}
          {activeProfile.portfolioImages && activeProfile.portfolioImages.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-amber-600" />
                  Galería de Trabajos & Instalaciones
                </h3>
                <span className="text-xs text-stone-500">
                  {activeProfile.portfolioImages.length} fotos
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {activeProfile.portfolioImages.map((imgUrl, i) => (
                  <div key={i} className="aspect-video bg-stone-100 rounded-xl overflow-hidden border border-stone-200">
                    <img
                      src={imgUrl}
                      alt={`Trabajo realizado ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Valoraciones & Comentarios */}
          <div className="pt-6 border-t border-stone-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  Valoraciones y Comentarios de la Comunidad
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Opiniones transparentes de vecinos y clientes que han contratado sus servicios.
                </p>
              </div>

              {/* Score header */}
              <div className="flex items-center gap-3 bg-stone-50 border border-stone-200 px-4 py-2.5 rounded-xl shrink-0">
                <span className="text-2xl font-black text-stone-900">{avgRating}</span>
                <div className="text-xs">
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= Math.round(Number(avgRating)) ? 'fill-amber-500' : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-stone-500 font-medium">
                    {totalReviews} {totalReviews === 1 ? 'opinión' : 'opiniones'}
                  </span>
                </div>
              </div>
            </div>

            {/* Write a review form */}
            <div className="bg-amber-50/50 border border-amber-200/80 rounded-2xl p-5 sm:p-6">
              <h4 className="text-sm font-bold text-stone-900 mb-1">
                ¿Has contratado este servicio o comprado aquí? Deja tu valoración
              </h4>
              <p className="text-xs text-stone-600 mb-4">
                Ayuda a otros vecinos y apoya a los buenos trabajadores con una recomendación honesta.
              </p>

              {reviewSuccess && (
                <div className="mb-4 p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  ¡Muchas gracias! Tu comentario y valoración han sido publicados con éxito.
                </div>
              )}

              {reviewError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-700" />
                  {reviewError}
                </div>
              )}

              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* Star rating selector */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Tu Calificación General:
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setRating(s)}
                        onMouseEnter={() => setHoverRating(s)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            s <= (hoverRating || rating)
                              ? 'text-[#D4A62A] fill-[#D4A62A] scale-110'
                              : 'text-stone-300 hover:text-[#D4A62A]/60'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-semibold text-stone-600 ml-2">
                      {rating === 5 && '¡Excelente trabajo! (5 estrellas)'}
                      {rating === 4 && 'Muy buen servicio (4 estrellas)'}
                      {rating === 3 && 'Aceptable (3 estrellas)'}
                      {rating === 2 && 'Regular (2 estrellas)'}
                      {rating === 1 && 'Mala experiencia (1 estrella)'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Client Name */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Tu Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Ej. Roberto Fallas"
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C8102E]"
                    />
                  </div>

                  {/* Service rendered */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Trabajo o gestión recibida (opcional)
                    </label>
                    <input
                      type="text"
                      value={serviceRendered}
                      onChange={(e) => setServiceRendered(e.target.value)}
                      placeholder="Ej. Pintura de tapia / Apoyo comunal / Casado"
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C8102E]"
                    />
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Comentario y Recomendación *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Cuéntanos sobre la puntualidad, calidad del trabajo, amabilidad, precio o gestión..."
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C8102E]"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-1.5 bg-[#C8102E] hover:bg-[#8E1220] active:scale-95 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-xs transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publicar Valoración</span>
                </button>
              </form>
            </div>

            {/* List of customer reviews */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-stone-900">
                Opiniones Registradas ({activeProfile.reviews.length})
              </h4>

              {activeProfile.reviews.length === 0 ? (
                <div className="text-center py-8 bg-stone-50 rounded-xl border border-dashed border-stone-300 text-stone-500 text-xs">
                  Aún no hay comentarios para este perfil. ¡Sé el primero en dejar tu valoración arriba!
                </div>
              ) : (
                <div className="space-y-3">
                  {activeProfile.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-white rounded-xl border border-stone-200/90 p-4 shadow-2xs space-y-2"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-stone-900 text-xs sm:text-sm">
                              {rev.author}
                            </span>
                            {rev.serviceRendered && (
                              <>
                                <span aria-hidden="true" className="text-stone-300">·</span>
                                <span className="text-[11px] text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 font-medium">
                                  {rev.serviceRendered}
                                </span>
                              </>
                            )}
                          </div>

                          {/* Star score */}
                          <div className="flex items-center gap-1 mt-1 text-amber-500">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3.5 h-3.5 ${
                                  s <= rev.rating ? 'fill-amber-500' : 'text-stone-300'
                                }`}
                              />
                            ))}
                            <span className="text-[11px] text-stone-500 ml-1.5">
                              {rev.date}
                            </span>
                          </div>
                        </div>

                        {/* Thumbs up / Helpful button */}
                        <button
                          type="button"
                          onClick={() => toggleHelpfulReview(activeProfile.id, rev.id)}
                          className="flex items-center gap-1 text-[11px] text-stone-500 hover:text-stone-800 bg-stone-100 hover:bg-stone-200/80 px-2 py-1 rounded transition-colors"
                          title="Marcar como útil"
                        >
                          <ThumbsUp className="w-3 h-3 text-stone-600" />
                          <span>Útil</span>
                          {rev.helpfulCount > 0 && (
                            <span className="font-bold text-stone-700">({rev.helpfulCount})</span>
                          )}
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed pt-1">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>Registrado el {activeProfile.createdAt}</span>
          <button
            onClick={() => setActiveProfile(null)}
            className="font-semibold text-stone-700 hover:text-stone-900 px-3 py-1.5 rounded-lg hover:bg-stone-200 transition-colors"
          >
            Cerrar Ficha
          </button>
        </div>
      </div>
    </div>
  );
};
