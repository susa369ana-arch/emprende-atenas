import React from 'react';
import { useDirectory } from '../context/DirectoryContext';
import { Plus, Share2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { chapters, setSelectedChapterId, setIsRegisterModalOpen, setViewMode, setActiveTab, openShareModal } = useDirectory();

  return (
    <footer className="bg-white text-[#2B2B2B] border-t border-stone-200 mt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col with Official Logo */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#C8102E] shrink-0 bg-white shadow-xs">
                <img
                  src="/assets/aistudio/IMG-20261104-WA0003_849a84ef.jpg"
                  alt="Logo Oficial"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-extrabold text-[#2B2B2B] text-base block">
                  Emprendimiento y Líderes Comunales
                </span>
                <span className="text-xs font-semibold text-[#C8102E]">
                  Apoya lo local, conecta con tu comunidad
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-600 max-w-sm leading-relaxed">
              Plataforma comunitaria para visibilizar, gestionar y apoyar a trabajadores locales y dirigentes comunitarios: talleres de pintura de autos, albañiles, pintores, tiendas, sodas caseras, artesanos y juntas de desarrollo integral (ADI).
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="text-xs font-bold text-[#C8102E] hover:text-[#8E1220] inline-flex items-center gap-1 underline underline-offset-4"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>¿Deseas inscribir tu negocio o cargo comunal? Haz clic aquí</span>
              </button>

              <button
                onClick={() => openShareModal({ type: 'app' })}
                className="text-xs font-bold text-[#2B2B2B] hover:text-[#C8102E] inline-flex items-center gap-1.5 bg-[#F5F5F5] hover:bg-stone-200 border border-stone-300 px-3 py-1.5 rounded-xl transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-[#C8102E]" />
                <span>Compartir App</span>
              </button>
            </div>
          </div>

          {/* Chapters Col */}
          <div>
            <h4 className="text-xs font-bold text-[#C8102E] uppercase tracking-wider mb-3">
              Capítulos Comunitarios
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-600">
              {chapters.slice(0, 6).map((ch) => (
                <li key={ch.id}>
                  <button
                    onClick={() => {
                      setSelectedChapterId(ch.id);
                      setViewMode('grid');
                      setActiveTab('emprendedores');
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="hover:text-[#C8102E] transition-colors"
                  >
                    {ch.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Transparencia y Valoraciones Col */}
          <div>
            <h4 className="text-xs font-bold text-[#C8102E] uppercase tracking-wider mb-3">
              Transparencia y Valoraciones
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Todas las opiniones y calificaciones provienen directamente de vecinos que han contratado los servicios o participado en las gestiones comunales. El registro es libre y solidario.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-stone-100 text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Emprendimiento y Líderes Comunales · Directorio Oficial.</p>
          <p className="text-stone-500 font-medium">
            Fomentando el trabajo local y el liderazgo de barrio
          </p>
        </div>
      </div>
    </footer>
  );
};
