import React from 'react';
import { useDirectory } from '../context/DirectoryContext';
import { Plus, ShoppingBag, Star, ShieldCheck, FileSpreadsheet, Share2 } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const {
    profiles,
    chapters,
    setIsRegisterModalOpen,
    setIsSheetsModalOpen,
    openShareModal,
    setActiveTab
  } = useDirectory();

  const totalReviewsCount = profiles.reduce((acc, p) => acc + p.reviews.length, 0);

  return (
    <section className="bg-white border-b border-stone-200/90 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left Text Column */}
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C8102E] bg-[#C8102E]/10 border border-[#C8102E]/20 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>Directorio Comunitario Oficial</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#2B2B2B] leading-tight">
              Emprendimiento y Líderes Comunales
            </h2>

            <p className="text-base sm:text-lg font-semibold text-[#C8102E]">
              Apoya lo local, conecta con tu comunidad.
            </p>

            <p className="text-xs sm:text-sm text-[#2B2B2B]/80 leading-relaxed">
              Encuentra a trabajadores independientes, oficios y dirigentes comunitarios de tu barrio:
              <strong className="text-[#2B2B2B]"> Líderes Comunales (ADI), Pinta Carros, Albañiles, Pintores, Tiendas & Minisúpers, Sodas (ej. Soda El Mirador) y Artesanos</strong>.
              Contacta directamente por WhatsApp, consulta direcciones con señas y lee valoraciones reales de vecinos.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="flex items-center gap-2 bg-[#C8102E] hover:bg-[#8E1220] active:scale-98 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Registra tu negocio o liderazgo</span>
              </button>

              <button
                onClick={() => openShareModal({ type: 'app' })}
                className="flex items-center gap-2 bg-[#F5F5F5] hover:bg-stone-200 text-[#2B2B2B] font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-stone-300 transition-colors shadow-2xs"
                title="Compartir la app por WhatsApp, QR o enlace"
              >
                <Share2 className="w-4 h-4 text-[#C8102E]" />
                <span>Compartir App</span>
              </button>

              <button
                onClick={() => setActiveTab('emprendedores')}
                className="flex items-center gap-2 bg-[#F5F5F5] hover:bg-stone-200 text-[#2B2B2B] font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-stone-300 transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-[#C8102E]" />
                <span>Ver Emprendedores</span>
              </button>

              <button
                onClick={() => setIsSheetsModalOpen(true)}
                className="flex items-center gap-1.5 text-xs text-[#C8102E] hover:text-[#8E1220] font-semibold underline underline-offset-4 py-1"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Fórmulas WhatsApp & Excel</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-stone-100 text-xs text-stone-500">
              <div>
                <span className="font-bold text-[#C8102E] text-base mr-1">{profiles.length}</span>
                <span>fichas registradas</span>
              </div>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <div>
                <span className="font-bold text-[#2B2B2B] text-base mr-1">{chapters.length}</span>
                <span>capítulos y áreas</span>
              </div>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-[#D4A62A] fill-[#D4A62A]" />
                <span className="font-bold text-[#2B2B2B] text-base mr-1">{totalReviewsCount}</span>
                <span>opiniones comunitarias</span>
              </div>
            </div>
          </div>

          {/* Right Column: Official Shield Badge Image */}
          <div className="shrink-0 flex items-center justify-center">
            <div className="relative group">
              <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full overflow-hidden shadow-xl border-4 border-[#C8102E] p-1 bg-white">
                <img
                  src="/assets/aistudio/IMG-20261104-WA0003_849a84ef.jpg"
                  alt="Escudo Oficial Emprendimiento y Líderes Comunales"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="text-center mt-2">
                <span className="inline-block text-[11px] font-bold text-[#C8102E] bg-white border border-[#C8102E]/30 px-2.5 py-0.5 rounded-full shadow-2xs">
                  Sello Comunitario
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
