export interface Review {
  id: string;
  author: string;
  rating: number; // 1 to 5
  comment: string;
  serviceRendered?: string;
  date: string;
  helpfulCount: number;
}

export interface Chapter {
  id: string;
  name: string;
  shortName: string;
  icon: string; // Lucide icon identifier
  description: string;
  tagline: string;
  isCommunityLeader?: boolean;
}

export interface Profile {
  id: string;
  name: string;
  businessName: string;
  chapterId: string;
  jobTitle: string; // "A qué se dedica" o "Rol comunal"
  specialties: string[];
  address: string; // "Dirección exacta"
  locality: string; // "Cantón, barrio o zona"
  phone: string;
  whatsapp: string; // clean digits for wa.me link
  schedule: string;
  experienceYears: number;
  pricingNote?: string;
  description: string;
  avatarUrl: string;
  portfolioImages: string[];
  isAvailable: boolean;
  reviews: Review[];
  createdAt: string;
  pin?: string; // 4-digit PIN for self-management
  categoryType?: 'emprendimiento' | 'lider_comunal';
  communityOrg?: string; // ej: "Asociación de Desarrollo Integral (ADI)", "Comité de Deportes"
}

export type SortOption = 'rating_desc' | 'reviews_desc' | 'newest' | 'name_asc';

export type MainTab = 'inicio' | 'emprendedores' | 'registro' | 'perfil';

export interface ShareTarget {
  type: 'app' | 'profile';
  profile?: Profile;
}
