import React from 'react';
import { DirectoryProvider, useDirectory } from './context/DirectoryContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ChapterTabs } from './components/ChapterTabs';
import { FilterBar } from './components/FilterBar';
import { ProfileCard } from './components/ProfileCard';
import { ChaptersWindowView } from './components/ChaptersWindowView';
import { MyProfileView } from './components/MyProfileView';
import { BottomNav } from './components/BottomNav';
import { ProfileModal } from './components/ProfileModal';
import { RegisterModal } from './components/RegisterModal';
import { EditProfileModal } from './components/EditProfileModal';
import { AddChapterModal } from './components/AddChapterModal';
import { GoogleSheetsIntegrationModal } from './components/GoogleSheetsIntegrationModal';
import { ShareModal } from './components/ShareModal';
import { Footer } from './components/Footer';
import { Plus, SearchX, RotateCcw, ShoppingBag, ShieldCheck } from 'lucide-react';

const DirectoryMain: React.FC = () => {
  const {
    profiles,
    filteredProfiles,
    viewMode,
    activeTab,
    setActiveTab,
    setIsRegisterModalOpen,
    resetToInitialData,
    searchQuery,
    setSearchQuery,
    setSelectedChapterId,
    setSelectedLocality,
    setMinRating
  } = useDirectory();

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedChapterId('all');
    setSelectedLocality('all');
    setMinRating(0);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#2B2B2B] flex flex-col font-sans pb-16">
      <Navbar />

      {/* RENDER BASED ON BOTTOM MENU TAB */}
      {activeTab === 'inicio' && (
        <>
          <HeroBanner />
          <ChapterTabs />

          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {viewMode === 'chapters' ? (
              <ChaptersWindowView />
            ) : (
              <div>
                <FilterBar />

                {/* Profile Grid */}
                {profiles.length === 0 ? (
                  <div className="bg-white border border-stone-200 rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto my-8 shadow-xs">
                    <RotateCcw className="w-12 h-12 text-[#C8102E] mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-[#2B2B2B]">
                      La estructura se encuentra vacía
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 mb-5 leading-relaxed">
                      Haz clic abajo para reconstruir de inmediato todos los capítulos (Líderes Comunales, Pinta Carros, Albañiles, Pintores, Tiendas, Sodas, Artesanos) y los perfiles comunitarios.
                    </p>

                    <button
                      onClick={() => resetToInitialData()}
                      className="px-5 py-2.5 text-xs font-bold text-white bg-[#C8102E] hover:bg-[#8E1220] rounded-xl shadow-xs transition-colors flex items-center gap-2 mx-auto"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reconstruir Estructura de MiBarrio</span>
                    </button>
                  </div>
                ) : filteredProfiles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProfiles.map((profile) => (
                      <ProfileCard key={profile.id} profile={profile} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-dashed border-stone-300 p-8 sm:p-12 text-center max-w-lg mx-auto my-8">
                    <SearchX className="w-12 h-12 text-stone-400 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-[#2B2B2B]">
                      No se encontraron resultados
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 mb-5 leading-relaxed">
                      {searchQuery
                        ? `No hay registros que coincidan con "${searchQuery}" con los filtros actuales.`
                        : 'No hay perfiles que coincidan con estos criterios de búsqueda.'}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={handleResetFilters}
                        className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
                      >
                        Restablecer filtros
                      </button>
                      <button
                        onClick={() => resetToInitialData()}
                        className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restaurar datos iniciales</span>
                      </button>
                      <button
                        onClick={() => setIsRegisterModalOpen(true)}
                        className="px-4 py-2 text-xs font-bold text-white bg-[#C8102E] hover:bg-[#8E1220] rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Registrar nuevo perfil</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </>
      )}

      {activeTab === 'emprendedores' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#C8102E]" />
                <h2 className="text-xl font-extrabold text-[#2B2B2B]">
                  Directorio de Emprendedores y Líderes
                </h2>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Explora todos los negocios, talleres, oficios y dirigentes comunitarios registrados.
              </p>
            </div>

            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="bg-[#C8102E] hover:bg-[#8E1220] text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Registra tu negocio</span>
            </button>
          </div>

          <ChapterTabs />
          <FilterBar />

          {filteredProfiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-stone-300 p-8 text-center max-w-lg mx-auto">
              <SearchX className="w-10 h-10 text-stone-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-[#2B2B2B]">Sin resultados con los filtros actuales</p>
              <button
                onClick={handleResetFilters}
                className="mt-3 text-xs font-semibold text-[#C8102E] underline"
              >
                Limpiar todos los filtros
              </button>
            </div>
          )}
        </main>
      )}

      {activeTab === 'perfil' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <MyProfileView />
        </main>
      )}

      <Footer />

      {/* Fixed Bottom Menu Requested by User */}
      <BottomNav />

      {/* Modals */}
      <ProfileModal />
      <RegisterModal />
      <EditProfileModal />
      <AddChapterModal />
      <GoogleSheetsIntegrationModal />
      <ShareModal />
    </div>
  );
};

export default function App() {
  return (
    <DirectoryProvider>
      <DirectoryMain />
    </DirectoryProvider>
  );
}
