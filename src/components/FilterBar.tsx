import React from 'react';
import { useDirectory } from '../context/DirectoryContext';
import { SortOption } from '../types';
import { MapPin, Star, ArrowDownWideNarrow } from 'lucide-react';

export const FilterBar: React.FC = () => {
  const {
    filteredProfiles,
    uniqueLocalities,
    selectedLocality,
    setSelectedLocality,
    sortBy,
    setSortBy,
    minRating,
    setMinRating,
    searchQuery,
    setSearchQuery,
    selectedChapterId,
    setSelectedChapterId
  } = useDirectory();

  const hasActiveFilters =
    selectedLocality !== 'all' ||
    minRating > 0 ||
    searchQuery.trim() !== '' ||
    selectedChapterId !== 'all';

  const resetAllFilters = () => {
    setSelectedLocality('all');
    setMinRating(0);
    setSearchQuery('');
    setSelectedChapterId('all');
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 p-3.5 sm:p-4 mb-6 shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Count summary & reset */}
        <div className="flex items-center gap-2 text-xs text-stone-600">
          <span className="font-bold text-[#2B2B2B] text-sm">
            {filteredProfiles.length}{' '}
            {filteredProfiles.length === 1 ? 'resultado disponible' : 'resultados disponibles'}
          </span>
          {hasActiveFilters && (
            <>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <button
                onClick={resetAllFilters}
                className="text-[#C8102E] hover:text-[#8E1220] font-semibold underline underline-offset-2"
              >
                Limpiar filtros
              </button>
            </>
          )}
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
          {/* Locality Selector */}
          <div className="flex items-center gap-1.5 bg-[#F5F5F5] border border-stone-200 rounded-xl px-3 py-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#C8102E] shrink-0" />
            <select
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value)}
              className="bg-transparent text-[#2B2B2B] font-medium focus:outline-none cursor-pointer pr-1"
            >
              <option value="all">Todas las zonas / barrios</option>
              {uniqueLocalities.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Min Rating Selector with Gold Stars */}
          <div className="flex items-center gap-1.5 bg-[#F5F5F5] border border-stone-200 rounded-xl px-3 py-1.5">
            <Star className="w-3.5 h-3.5 text-[#D4A62A] fill-[#D4A62A] shrink-0" />
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="bg-transparent text-[#2B2B2B] font-medium focus:outline-none cursor-pointer pr-1"
            >
              <option value="0">Cualquier valoración</option>
              <option value="4">4.0 estrellas o más</option>
              <option value="4.5">4.5 estrellas o más</option>
              <option value="5">5 estrellas exactas</option>
            </select>
          </div>

          {/* Sort By Selector */}
          <div className="flex items-center gap-1.5 bg-[#F5F5F5] border border-stone-200 rounded-xl px-3 py-1.5">
            <ArrowDownWideNarrow className="w-3.5 h-3.5 text-stone-500 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent text-[#2B2B2B] font-medium focus:outline-none cursor-pointer pr-1"
            >
              <option value="rating_desc">Mejor valorados primero</option>
              <option value="reviews_desc">Más opiniones comunitarias</option>
              <option value="newest">Más recientes</option>
              <option value="name_asc">Nombre comercial (A-Z)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
