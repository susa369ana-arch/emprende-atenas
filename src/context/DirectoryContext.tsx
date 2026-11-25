import React, { createContext, useContext, useState, useEffect } from 'react';
import { Chapter, Profile, Review, SortOption, MainTab, ShareTarget } from '../types';
import { INITIAL_CHAPTERS, INITIAL_PROFILES } from '../data/initialData';
import { cleanWhatsAppNumber, buildWhatsAppLink } from '../utils/whatsapp';

interface DirectoryContextType {
  chapters: Chapter[];
  profiles: Profile[];
  selectedChapterId: string | 'all';
  searchQuery: string;
  selectedLocality: string;
  sortBy: SortOption;
  minRating: number;
  activeProfile: Profile | null;
  isRegisterModalOpen: boolean;
  isAddChapterModalOpen: boolean;
  isEditModalOpen: boolean;
  editingProfile: Profile | null;
  isSheetsModalOpen: boolean;
  isShareModalOpen: boolean;
  shareTarget: ShareTarget;
  viewMode: 'grid' | 'chapters';
  activeTab: MainTab;
  myProfileIds: string[];

  // Actions
  setSelectedChapterId: (id: string | 'all') => void;
  setSearchQuery: (query: string) => void;
  setSelectedLocality: (locality: string) => void;
  setSortBy: (sort: SortOption) => void;
  setMinRating: (rating: number) => void;
  setActiveProfile: (profile: Profile | null) => void;
  setIsRegisterModalOpen: (open: boolean) => void;
  setIsAddChapterModalOpen: (open: boolean) => void;
  setIsEditModalOpen: (open: boolean) => void;
  setEditingProfile: (profile: Profile | null) => void;
  setIsSheetsModalOpen: (open: boolean) => void;
  setIsShareModalOpen: (open: boolean) => void;
  setShareTarget: (target: ShareTarget) => void;
  openShareModal: (target?: ShareTarget) => void;
  setViewMode: (mode: 'grid' | 'chapters') => void;
  setActiveTab: (tab: MainTab) => void;

  addProfile: (profile: Omit<Profile, 'id' | 'createdAt' | 'reviews'>) => void;
  updateProfile: (id: string, updatedData: Partial<Profile>) => boolean;
  deleteProfile: (id: string) => void;
  addReview: (profileId: string, review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;
  toggleHelpfulReview: (profileId: string, reviewId: string) => void;
  addChapter: (chapter: Omit<Chapter, 'id'>) => void;
  resetToInitialData: () => void;
  exportToGoogleSheetsCSV: () => void;
  claimProfileWithPin: (id: string, pin: string) => boolean;

  // Filtered lists
  filteredProfiles: Profile[];
  myProfiles: Profile[];
  uniqueLocalities: string[];
  getChapterStats: (chapterId: string) => { count: number; avgRating: number; reviewsCount: number };
}

const STORAGE_KEY_PROFILES = 'emprendimiento_lideres_v4_profiles';
const STORAGE_KEY_CHAPTERS = 'emprendimiento_lideres_v4_chapters';
const STORAGE_KEY_MY_PROFILES = 'emprendimiento_lideres_v4_my_ids';

const DirectoryContext = createContext<DirectoryContextType | undefined>(undefined);

export const DirectoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chapters, setChapters] = useState<Chapter[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CHAPTERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_CHAPTERS;
  });

  const [profiles, setProfiles] = useState<Profile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_PROFILES;
  });

  const [myProfileIds, setMyProfileIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MY_PROFILES);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ['p-5-mirador']; // sample owned business
  });

  const [activeTab, setActiveTab] = useState<MainTab>('inicio');
  const [selectedChapterId, setSelectedChapterId] = useState<string | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLocality, setSelectedLocality] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('rating_desc');
  const [minRating, setMinRating] = useState<number>(0);
  const [activeProfile, setActiveProfileState] = useState<Profile | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [isAddChapterModalOpen, setIsAddChapterModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [isSheetsModalOpen, setIsSheetsModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [shareTarget, setShareTarget] = useState<ShareTarget>({ type: 'app' });
  const [viewMode, setViewMode] = useState<'grid' | 'chapters'>('grid');

  // Custom setter for activeProfile to sync URL query parameter (?p=id)
  const setActiveProfile = (target: Profile | null) => {
    setActiveProfileState(target);
    try {
      if (typeof window !== 'undefined' && window.location) {
        const url = new URL(window.location.href);
        if (target) {
          url.searchParams.set('p', target.id);
        } else {
          url.searchParams.delete('p');
          url.searchParams.delete('perfil');
        }
        window.history.replaceState({}, '', url.toString());
      }
    } catch {
      // ignore
    }
  };

  // Deep linking: read ?p= or ?perfil= on initial load
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.location) {
        const urlParams = new URLSearchParams(window.location.search);
        const profileParam = urlParams.get('p') || urlParams.get('perfil');
        if (profileParam) {
          const match = profiles.find((p) => p.id === profileParam);
          if (match) {
            setActiveProfileState(match);
          }
        }
      }
    } catch {
      // ignore
    }
  }, [profiles]);

  const openShareModal = (target?: ShareTarget) => {
    if (target) {
      setShareTarget(target);
    } else if (activeProfile) {
      setShareTarget({ type: 'profile', profile: activeProfile });
    } else {
      setShareTarget({ type: 'app' });
    }
    setIsShareModalOpen(true);
  };

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CHAPTERS, JSON.stringify(chapters));
    } catch (e) {
      console.error(e);
    }
  }, [chapters]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify(profiles));
    } catch (e) {
      console.error(e);
    }
  }, [profiles]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MY_PROFILES, JSON.stringify(myProfileIds));
    } catch (e) {
      console.error(e);
    }
  }, [myProfileIds]);

  useEffect(() => {
    if (activeProfile) {
      const refreshed = profiles.find((p) => p.id === activeProfile.id);
      if (refreshed) setActiveProfileState(refreshed);
    }
  }, [profiles]);

  const addProfile = (profileData: Omit<Profile, 'id' | 'createdAt' | 'reviews'>) => {
    const cleanedWhatsApp = cleanWhatsAppNumber(profileData.whatsapp || profileData.phone);
    const newId = `p-${Date.now()}`;

    const newProfile: Profile = {
      ...profileData,
      whatsapp: cleanedWhatsApp,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0],
      reviews: []
    };

    setProfiles((prev) => [newProfile, ...prev]);
    setMyProfileIds((prev) => [newId, ...prev]);
  };

  const updateProfile = (id: string, updatedData: Partial<Profile>): boolean => {
    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const rawPhone = updatedData.phone !== undefined ? updatedData.phone : p.phone;
          const rawWhatsApp = updatedData.whatsapp !== undefined ? updatedData.whatsapp : (p.whatsapp || rawPhone);
          const cleanedWhatsApp = cleanWhatsAppNumber(rawWhatsApp);

          return {
            ...p,
            ...updatedData,
            whatsapp: cleanedWhatsApp
          };
        }
        return p;
      })
    );
    return true;
  };

  const deleteProfile = (id: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
    setMyProfileIds((prev) => prev.filter((pid) => pid !== id));
    if (activeProfile?.id === id) setActiveProfile(null);
    if (editingProfile?.id === id) {
      setEditingProfile(null);
      setIsEditModalOpen(false);
    }
  };

  const claimProfileWithPin = (id: string, pin: string): boolean => {
    const target = profiles.find((p) => p.id === id);
    if (target && target.pin === pin) {
      if (!myProfileIds.includes(id)) {
        setMyProfileIds((prev) => [...prev, id]);
      }
      return true;
    }
    return false;
  };

  const addReview = (profileId: string, reviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0
    };

    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id === profileId) {
          return {
            ...p,
            reviews: [newReview, ...p.reviews]
          };
        }
        return p;
      })
    );
  };

  const toggleHelpfulReview = (profileId: string, reviewId: string) => {
    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id === profileId) {
          return {
            ...p,
            reviews: p.reviews.map((r) => {
              if (r.id === reviewId) {
                return { ...r, helpfulCount: r.helpfulCount + 1 };
              }
              return r;
            })
          };
        }
        return p;
      })
    );
  };

  const addChapter = (chapterData: Omit<Chapter, 'id'>) => {
    const slug = chapterData.shortName
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-');
    const newChapter: Chapter = {
      ...chapterData,
      id: `${slug}-${Date.now().toString().slice(-4)}`
    };
    setChapters((prev) => [...prev, newChapter]);
    setSelectedChapterId(newChapter.id);
  };

  const resetToInitialData = () => {
    setChapters([...INITIAL_CHAPTERS]);
    setProfiles([...INITIAL_PROFILES]);
    setSelectedChapterId('all');
    setSearchQuery('');
    setSelectedLocality('all');
    setMinRating(0);
    setActiveProfile(null);
    try {
      localStorage.setItem(STORAGE_KEY_CHAPTERS, JSON.stringify(INITIAL_CHAPTERS));
      localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify(INITIAL_PROFILES));
      localStorage.setItem(STORAGE_KEY_MY_PROFILES, JSON.stringify(['p-5-mirador']));
    } catch {
      // ignore
    }
  };

  const getChapterStats = (chapterId: string) => {
    const chapterProfiles = profiles.filter((p) => p.chapterId === chapterId);
    const count = chapterProfiles.length;
    let totalReviews = 0;
    let sumScore = 0;
    let scoredItems = 0;

    chapterProfiles.forEach((p) => {
      p.reviews.forEach((r) => {
        totalReviews += 1;
        sumScore += r.rating;
        scoredItems += 1;
      });
    });

    const avgRating = scoredItems > 0 ? Number((sumScore / scoredItems).toFixed(1)) : 5.0;
    return { count, avgRating, reviewsCount: totalReviews };
  };

  const uniqueLocalities = Array.from(
    new Set(
      profiles
        .map((p) => p.locality.trim())
        .filter(Boolean)
    )
  ).sort();

  const calculateProfileAverage = (p: Profile): number => {
    if (!p.reviews || p.reviews.length === 0) return 0;
    const sum = p.reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / p.reviews.length;
  };

  const filteredProfiles = profiles
    .filter((p) => {
      if (selectedChapterId !== 'all' && p.chapterId !== selectedChapterId) {
        return false;
      }
      if (selectedLocality !== 'all' && p.locality.trim() !== selectedLocality.trim()) {
        return false;
      }
      const avg = calculateProfileAverage(p);
      if (minRating > 0) {
        if (p.reviews.length === 0 || avg < minRating) return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesBusiness = p.businessName.toLowerCase().includes(query);
        const matchesJob = p.jobTitle.toLowerCase().includes(query);
        const matchesAddress = p.address.toLowerCase().includes(query);
        const matchesLocality = p.locality.toLowerCase().includes(query);
        const matchesDescription = p.description.toLowerCase().includes(query);
        const matchesSpecialties = p.specialties?.some((s) => s.toLowerCase().includes(query));

        if (
          !matchesName &&
          !matchesBusiness &&
          !matchesJob &&
          !matchesAddress &&
          !matchesLocality &&
          !matchesDescription &&
          !matchesSpecialties
        ) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      const avgA = calculateProfileAverage(a);
      const avgB = calculateProfileAverage(b);
      if (sortBy === 'rating_desc') {
        if (avgB !== avgA) return avgB - avgA;
        return (b.reviews?.length || 0) - (a.reviews?.length || 0);
      }
      if (sortBy === 'reviews_desc') {
        return (b.reviews?.length || 0) - (a.reviews?.length || 0);
      }
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'name_asc') {
        return a.businessName.localeCompare(b.businessName);
      }
      return 0;
    });

  const myProfiles = profiles.filter((p) => myProfileIds.includes(p.id));

  const exportToGoogleSheetsCSV = () => {
    const headers = [
      'Tipo (Emprendedor o Líder Comunal)',
      'ID',
      'Nombre_Persona',
      'Nombre_Negocio_u_Organizacion (Col E)',
      'A_Que_Se_Dedica / Rol_Comunal',
      'Capitulo_ID',
      'Direccion_Exacta',
      'Localidad',
      'Telefono_Ingresado (Col H)',
      'Numero_WhatsApp_Limpio (Col M)',
      'Enlace_WhatsApp_Generado (Col N)',
      'Calificacion_Estrellas',
      'Total_Opiniones',
      'Horario_Atencion',
      'Anios_Experiencia',
      'Disponible'
    ];

    const sanitize = (val: string | number | boolean | undefined) => {
      if (val === undefined || val === null) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = profiles.map((p) => {
      const avg = calculateProfileAverage(p).toFixed(1);
      const cleanPhone = cleanWhatsAppNumber(p.phone);
      const waLink = buildWhatsAppLink(p.phone, p.businessName, '506', p.jobTitle).fullUrl;
      const typeLabel = p.chapterId === 'lideres-comunales' ? 'Líder Comunal' : 'Emprendimiento / Oficio';

      return [
        sanitize(typeLabel),
        sanitize(p.id),
        sanitize(p.name),
        sanitize(p.businessName),
        sanitize(p.jobTitle),
        sanitize(p.chapterId),
        sanitize(p.address),
        sanitize(p.locality),
        sanitize(p.phone),
        sanitize(cleanPhone),
        sanitize(waLink),
        sanitize(avg),
        sanitize(p.reviews.length),
        sanitize(p.schedule),
        sanitize(p.experienceYears),
        sanitize(p.isAvailable ? 'SI' : 'NO')
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Emprendimiento_y_Lideres_Comunales_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <DirectoryContext.Provider
      value={{
        chapters,
        profiles,
        selectedChapterId,
        searchQuery,
        selectedLocality,
        sortBy,
        minRating,
        activeProfile,
        isRegisterModalOpen,
        isAddChapterModalOpen,
        isEditModalOpen,
        editingProfile,
        isSheetsModalOpen,
        isShareModalOpen,
        shareTarget,
        viewMode,
        activeTab,
        myProfileIds,
        setSelectedChapterId,
        setSearchQuery,
        setSelectedLocality,
        setSortBy,
        setMinRating,
        setActiveProfile,
        setIsRegisterModalOpen,
        setIsAddChapterModalOpen,
        setIsEditModalOpen,
        setEditingProfile,
        setIsSheetsModalOpen,
        setIsShareModalOpen,
        setShareTarget,
        openShareModal,
        setViewMode,
        setActiveTab,
        addProfile,
        updateProfile,
        deleteProfile,
        addReview,
        toggleHelpfulReview,
        addChapter,
        resetToInitialData,
        exportToGoogleSheetsCSV,
        claimProfileWithPin,
        filteredProfiles,
        myProfiles,
        uniqueLocalities,
        getChapterStats
      }}
    >
      {children}
    </DirectoryContext.Provider>
  );
};

export const useDirectory = () => {
  const context = useContext(DirectoryContext);
  if (!context) {
    throw new Error('useDirectory must be used within a DirectoryProvider');
  }
  return context;
};
