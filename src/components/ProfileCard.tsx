import React from 'react';
import { Profile } from '../types';
import { useDirectory } from '../context/DirectoryContext';
import { ChapterIcon } from './ChapterIcon';
import { MapPin, Phone, MessageCircle, Star, Clock, Award, ChevronRight, ShieldCheck, Share2 } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';

interface ProfileCardProps {
  profile: Profile;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const { chapters, setActiveProfile, openShareModal } = useDirectory();

  const chapter = chapters.find((c) => c.id === profile.chapterId);
  const isLeader = profile.chapterId === 'lideres-comunales';

  const avgRating =
    profile.reviews.length > 0
      ? (profile.reviews.reduce((acc, r) => acc + r.rating, 0) / profile.reviews.length).toFixed(1)
      : null;

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { fullUrl } = buildWhatsAppLink(
      profile.phone,
      profile.businessName,
      '506',
      profile.jobTitle
    );
    if (fullUrl) {
      window.open(fullUrl, '_blank');
    }
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`tel:${profile.phone}`, '_self');
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    openShareModal({ type: 'profile', profile });
  };

  return (
    <article
      onClick={() => setActiveProfile(profile)}
      className="group bg-[#FFFFFF] rounded-2xl border border-stone-200/90 hover:border-[#C8102E]/60 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
    >
      <div>
        {/* Photo Header */}
        <div className="relative h-44 bg-stone-100 overflow-hidden">
          <img
            src={profile.portfolioImages[0] || profile.avatarUrl}
            alt={profile.businessName}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B2B]/85 via-[#2B2B2B]/30 to-transparent" />

          {/* Chapter badge */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg backdrop-blur-xs font-semibold ${
                isLeader
                  ? 'bg-[#C8102E] text-white shadow-xs'
                  : 'bg-[#2B2B2B]/80 text-white'
              }`}
            >
              {chapter && (
                <ChapterIcon
                  name={chapter.icon}
                  className={`w-3.5 h-3.5 ${isLeader ? 'text-white' : 'text-[#D4A62A]'}`}
                />
              )}
              <span>{chapter?.shortName || 'Oficio'}</span>
            </span>

            {profile.isAvailable && (
              <span className="inline-flex items-center gap-1 bg-emerald-950/80 backdrop-blur-xs text-emerald-300 px-2 py-0.5 rounded-md font-medium text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Disponible
              </span>
            )}
          </div>

          {/* Business & Person Name */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="text-base sm:text-lg font-bold leading-snug drop-shadow-sm group-hover:text-white transition-colors">
              {profile.businessName}
            </h3>
            <p className="text-xs text-stone-200 font-medium drop-shadow-xs">
              {profile.name}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-3">
          {/* Metadata: Stars in #D4A62A */}
          <div className="flex items-center gap-2 text-xs text-stone-600">
            {avgRating ? (
              <>
                <div className="flex items-center gap-1 font-bold text-[#2B2B2B]">
                  <Star className="w-3.5 h-3.5 text-[#D4A62A] fill-[#D4A62A]" />
                  <span>{avgRating}</span>
                </div>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>
                  {profile.reviews.length}{' '}
                  {profile.reviews.length === 1 ? 'opinión' : 'opiniones'}
                </span>
              </>
            ) : (
              <span className="text-stone-400 italic">Sin opiniones aún</span>
            )}
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1 text-stone-500">
              <Award className="w-3 h-3 text-[#C8102E]" />
              {profile.experienceYears} años exp.
            </span>
          </div>

          {/* Dedication / Job */}
          <div>
            <p className="text-[11px] font-bold text-[#C8102E] uppercase tracking-wide mb-0.5">
              {isLeader ? 'Rol y Liderazgo Comunal' : 'A qué se dedica'}
            </p>
            <p className="text-xs sm:text-sm text-[#2B2B2B] font-semibold line-clamp-2 leading-relaxed">
              {profile.jobTitle}
            </p>
          </div>

          {/* Address with signs */}
          <div className="pt-2 border-t border-stone-100 flex items-start gap-2 text-xs text-stone-600">
            <MapPin className="w-3.5 h-3.5 text-[#C8102E] shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="font-bold text-[#2B2B2B] block truncate">
                {profile.locality}
              </span>
              <p className="text-stone-500 line-clamp-2 text-[11px] leading-normal">
                {profile.address}
              </p>
            </div>
          </div>

          {/* Schedule */}
          <div className="flex items-center gap-1.5 text-[11px] text-stone-500 truncate">
            <Clock className="w-3 h-3 shrink-0 text-stone-400" />
            <span className="truncate">{profile.schedule}</span>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-4 py-3 bg-[#F5F5F5] border-t border-stone-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Official WhatsApp Button in RED with WHITE letters */}
          <button
            type="button"
            onClick={handleWhatsApp}
            title="Escribir por WhatsApp directo"
            className="flex items-center gap-1.5 bg-[#C8102E] hover:bg-[#8E1220] active:scale-95 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Escribir por WhatsApp</span>
          </button>

          {/* Call Button */}
          <button
            type="button"
            onClick={handleCall}
            title={`Llamar al ${profile.phone}`}
            className="flex items-center gap-1 bg-white hover:bg-stone-200 text-[#2B2B2B] border border-stone-200 text-xs font-semibold px-2.5 py-2 rounded-xl transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            title="Compartir esta ficha por WhatsApp, QR o redes"
            className="flex items-center gap-1 bg-white hover:bg-stone-200 text-[#2B2B2B] border border-stone-200 text-xs font-semibold px-2.5 py-2 rounded-xl transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-[#C8102E]" />
          </button>
        </div>

        {/* View Profile */}
        <span className="text-xs font-bold text-[#2B2B2B] group-hover:text-[#C8102E] flex items-center gap-0.5">
          Ver ficha
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </article>
  );
};
