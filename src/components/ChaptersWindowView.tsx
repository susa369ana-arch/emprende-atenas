import React, { useState } from 'react';
import { useDirectory } from '../context/DirectoryContext';
import { ChapterIcon } from './ChapterIcon';
import { ProfileCard } from './ProfileCard';
import { Plus, Star, Users, ArrowUpRight } from 'lucide-react';

export const ChaptersWindowView: React.FC = () => {
  const {
    chapters,
    profiles,
    getChapterStats,
    setSelectedChapterId,
    setIsRegisterModalOpen,
    setViewMode
  } = useDirectory();

  const [activeWindowTab, setActiveWindowTab] = useState<string>(chapters[0]?.id || '');

  const currentChapter = chapters.find((c) => c.id === activeWindowTab) || chapters[0];
  const chapterProfiles = profiles.filter((p) => p.chapterId === currentChapter?.id);
  const stats = currentChapter ? getChapterStats(currentChapter.id) : { count: 0, avgRating: 5, reviewsCount: 0 };

  return (
    <div className="space-y-6">
      {/* Chapter Windows Navigation Deck */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-stone-100">
          <div>
            <h2 className="text-xl font-extrabold text-[#2B2B2B]">
              Ventanas de Capítulos & Líderes Comunales
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Explora los oficios, comercios y dirigencias organizados por categorías independientes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#C8102E] hover:bg-[#8E1220] active:scale-95 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition-all shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Inscribir en este capítulo</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className="flex items-center gap-1 text-xs text-[#2B2B2B] hover:text-[#C8102E] px-3 py-2 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors"
            >
              <span>Ver todo el directorio</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Chapter Grid Selector Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 pt-4">
          {chapters.map((chapter) => {
            const isActive = activeWindowTab === chapter.id;
            const chStats = getChapterStats(chapter.id);
            const isLeader = chapter.id === 'lideres-comunales';

            return (
              <button
                key={chapter.id}
                onClick={() => setActiveWindowTab(chapter.id)}
                className={`text-left p-3.5 rounded-2xl border transition-all ${
                  isActive
                    ? 'border-[#C8102E] bg-[#C8102E]/5 shadow-xs ring-1 ring-[#C8102E]/20'
                    : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/60 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-2 rounded-xl ${
                      isActive
                        ? 'bg-[#C8102E] text-white font-bold'
                        : isLeader
                        ? 'bg-[#C8102E]/10 text-[#C8102E]'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    <ChapterIcon name={chapter.icon} className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono text-stone-500 font-semibold">
                    {chStats.count} {chStats.count === 1 ? 'perfil' : 'perfiles'}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-[#2B2B2B] truncate">
                  {chapter.shortName}
                </h3>
                <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                  {chapter.tagline}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Chapter Window Box */}
      {currentChapter && (
        <section className="bg-stone-100/70 rounded-2xl border border-stone-200 p-4 sm:p-6">
          {/* Window Banner */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#C8102E]/10 border border-[#C8102E]/20 rounded-2xl text-[#C8102E] shrink-0">
                <ChapterIcon name={currentChapter.icon} className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#2B2B2B]">
                  Capítulo: {currentChapter.name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
                  {currentChapter.description}
                </p>

                {/* Chapter Meta */}
                <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-stone-500">
                  <span className="flex items-center gap-1 font-semibold text-[#2B2B2B]">
                    <Users className="w-3.5 h-3.5 text-[#C8102E]" />
                    {stats.count} registrados
                  </span>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <span className="flex items-center gap-1 font-semibold text-[#2B2B2B]">
                    <Star className="w-3.5 h-3.5 text-[#D4A62A] fill-[#D4A62A]" />
                    {stats.avgRating} promedio
                  </span>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <span>{stats.reviewsCount} opiniones comunitarias</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedChapterId(currentChapter.id);
                setIsRegisterModalOpen(true);
              }}
              className="bg-[#C8102E] hover:bg-[#8E1220] active:scale-95 text-white font-bold px-4 py-2 rounded-xl text-xs shrink-0 self-start md:self-auto flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Inscribir perfil aquí</span>
            </button>
          </div>

          {/* Members in this window */}
          {chapterProfiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {chapterProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-stone-300 p-8 text-center max-w-md mx-auto my-6">
              <ChapterIcon name={currentChapter.icon} className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-[#2B2B2B]">
                Aún no hay registros en este capítulo
              </p>
              <p className="text-xs text-stone-500 mt-1 mb-4">
                ¿Trabajas en este oficio o formas parte de esta organización comunal? Sé el primer perfil.
              </p>
              <button
                onClick={() => {
                  setSelectedChapterId(currentChapter.id);
                  setIsRegisterModalOpen(true);
                }}
                className="bg-[#C8102E] hover:bg-[#8E1220] text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors"
              >
                Inscribirme en {currentChapter.shortName}
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
