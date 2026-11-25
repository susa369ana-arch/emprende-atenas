import React from 'react';
import { useDirectory } from '../context/DirectoryContext';
import { MainTab } from '../types';
import { Search, Plus, RotateCcw, FileSpreadsheet, Home, ShoppingBag, User, Share2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    setIsRegisterModalOpen,
    setIsSheetsModalOpen,
    openShareModal,
    resetToInitialData,
    activeTab,
    setActiveTab
  } = useDirectory();

  const handleReset = () => {
    if (
      window.confirm(
        '¿Deseas restaurar la estructura con todos los capítulos, líderes comunales y emprendimientos originales?'
      )
    ) {
      resetToInitialData();
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#C8102E] text-white shadow-md border-b border-[#8E1220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          {/* Official Brand Logo & Title */}
          <div
            onClick={() => setActiveTab('inicio')}
            className="flex items-center gap-3 min-w-0 cursor-pointer group"
          >
            {/* Logo image with shield design */}
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/90 shadow-md shrink-0 bg-white group-hover:scale-105 transition-transform">
              <img
                src="/assets/aistudio/IMG-20261104-WA0003_849a84ef.jpg"
                alt="Logo Emprendimiento y Líderes Comunales"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <h1 className="text-base sm:text-lg md:text-xl font-extrabold tracking-tight text-white leading-tight truncate">
                Emprendimiento y Líderes Comunales
              </h1>
              <p className="text-[11px] sm:text-xs text-white/90 font-medium truncate">
                Apoya lo local, conecta con tu comunidad
              </p>
            </div>
          </div>

          {/* Quick Search */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab === 'perfil') setActiveTab('emprendedores');
                }}
                placeholder="Buscar por oficio, negocio, líder o dirección..."
                className="w-full pl-10 pr-4 py-2 bg-white text-[#2B2B2B] placeholder-stone-400 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-white/80 shadow-xs transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-[#C8102E]"
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>

          {/* Actions & Section Shortcuts */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Desktop Section Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-[#8E1220]/60 p-1 rounded-xl text-xs text-white">
              <button
                onClick={() => setActiveTab('inicio')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'inicio'
                    ? 'bg-white text-[#C8102E] shadow-xs'
                    : 'hover:bg-white/10'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Inicio</span>
              </button>

              <button
                onClick={() => setActiveTab('emprendedores')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'emprendedores'
                    ? 'bg-white text-[#C8102E] shadow-xs'
                    : 'hover:bg-white/10'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Emprendedores</span>
              </button>

              <button
                onClick={() => setActiveTab('perfil')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'perfil'
                    ? 'bg-white text-[#C8102E] shadow-xs'
                    : 'hover:bg-white/10'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Mi perfil</span>
              </button>
            </nav>

            {/* Share App Button */}
            <button
              onClick={() => openShareModal({ type: 'app' })}
              className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 active:bg-[#8E1220] text-white border border-white/20 px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
              title="Compartir directorio por WhatsApp, QR o redes sociales"
            >
              <Share2 className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">Compartir</span>
            </button>

            {/* Sheets & Formulas Modal button */}
            <button
              onClick={() => setIsSheetsModalOpen(true)}
              className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 active:bg-[#8E1220] text-white border border-white/20 px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
              title="Ver fórmulas de WhatsApp y exportación a Excel / Google Sheets"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-white" />
              <span className="hidden md:inline">Excel & Fórmulas</span>
            </button>

            {/* Reset initial sample data */}
            <button
              onClick={handleReset}
              title="Restaurar datos y capítulos originales"
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="flex items-center gap-1.5 bg-white text-[#C8102E] hover:bg-stone-100 active:bg-stone-200 font-bold px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm shadow-sm transition-all"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Registra tu negocio</span>
              <span className="sm:hidden">Registrar</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar oficio, líder, dirección o negocio..."
              className="w-full pl-9 pr-8 py-2 bg-white text-[#2B2B2B] placeholder-stone-400 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-white/80"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-[#C8102E] px-1"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
