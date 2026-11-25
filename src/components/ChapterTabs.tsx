import React from 'react';
import { useDirectory } from '../context/DirectoryContext';
import { ChapterIcon } from './ChapterIcon';
import { Plus, LayoutGrid, ShieldCheck } from 'lucide-react';

export const ChapterTabs: React.FC = () => {
  const {
    chapters,
    selectedChapterId,
    setSelectedChapterId,
    setIsAddChapterModalOpen,
    profiles,
    setIsRegisterModalOpen
  } = useDirectory();

  const getCountForChapter = (chapterId: string) => {
    return profiles.filter((p) => p.chapterId === chapterId).length;
  };

  const selectedChapter = chapters.find((c) => c.id === selectedChapterId);

  return (
    <div className="bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Horizontal tabs with clean scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar scroll-smooth">
          {/* 'All' button */}
          <button
            onClick={() => setSelectedChapterId('all')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
              selectedChapterId === 'all'
                ? 'bg-[#C8102E] text-white shadow-xs'
                : 'text-[#2B2B2B] hover:bg-stone-100'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Todos los Capítulos</span>
            <span
              className={`text-xs px-1.5 py-0.2 rounded-md ${
                selectedChapterId === 'all'
                  ? 'bg-[#8E1220] text-white'
                  : 'bg-stone-100 text-stone-600'
              }`}
            >
              {profiles.length}
            </span>
          </button>

          {/* Each chapter */}
          {chapters.map((chapter) => {
            const isSelected = selectedChapterId === chapter.id;
            const count = getCountForChapter(chapter.id);
            const isLeader = chapter.id === 'lideres-comunales';

            return (
              <button
                key={chapter.id}
                onClick={() => setSelectedChapterId(chapter.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isSelected
                    ? 'bg-[#C8102E] text-white shadow-xs'
                    : isLeader
                    ? 'text-[#C8102E] bg-[#C8102E]/5 hover:bg-[#C8102E]/10 border border-[#C8102E]/20'
                    : 'text-[#2B2B2B] hover:bg-stone-100'
                }`}
              >
                <ChapterIcon
                  name={chapter.icon}
                  className={`w-4 h-4 ${isSelected ? 'text-white' : isLeader ? 'text-[#C8102E]' : 'text-stone-500'}`}
                />
                <span>{chapter.shortName}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-md font-mono ${
                    isSelected ? 'bg-[#8E1220] text-white font-bold' : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}

          {/* Add custom chapter */}
          <button
            onClick={() => setIsAddChapterModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#2B2B2B]/70 hover:text-[#C8102E] hover:bg-stone-100 transition-colors whitespace-nowrap shrink-0 border border-dashed border-stone-300"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nuevo Capítulo</span>
          </button>
        </div>

        {/* Selected Chapter Spotlight Banner */}
        {selectedChapter && (
          <div className="py-4 border-t border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-[#C8102E]/10 border border-[#C8102E]/20 text-[#C8102E] shrink-0 mt-0.5">
                <ChapterIcon name={selectedChapter.icon} className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-[#2B2B2B]">
                    Capítulo: {selectedChapter.name}
                  </h3>
                  <span className="text-xs text-stone-500 font-normal">
                    · {getCountForChapter(selectedChapter.id)} registrados
                  </span>
                </div>
                <p className="text-xs text-stone-600 max-w-3xl mt-0.5">
                  {selectedChapter.description}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="text-xs font-bold px-3.5 py-2 rounded-xl bg-[#C8102E] hover:bg-[#8E1220] text-white transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Inscribirme en este capítulo</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
