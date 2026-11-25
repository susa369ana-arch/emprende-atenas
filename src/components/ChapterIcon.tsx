import React from 'react';
import {
  Car,
  Hammer,
  Paintbrush,
  Store,
  UtensilsCrossed,
  Scissors,
  Wrench,
  Sparkles,
  Briefcase,
  Zap,
  Building,
  Truck,
  HeartHandshake,
  ShieldCheck,
  Users,
  Award,
  Landmark,
  Megaphone
} from 'lucide-react';

interface ChapterIconProps {
  name: string;
  className?: string;
}

export const ChapterIcon: React.FC<ChapterIconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'Users':
      return <Users className={className} />;
    case 'Award':
      return <Award className={className} />;
    case 'Landmark':
      return <Landmark className={className} />;
    case 'Megaphone':
      return <Megaphone className={className} />;
    case 'Car':
      return <Car className={className} />;
    case 'Hammer':
      return <Hammer className={className} />;
    case 'Paintbrush':
      return <Paintbrush className={className} />;
    case 'Store':
      return <Store className={className} />;
    case 'UtensilsCrossed':
      return <UtensilsCrossed className={className} />;
    case 'Scissors':
      return <Scissors className={className} />;
    case 'Wrench':
      return <Wrench className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    case 'Building':
      return <Building className={className} />;
    case 'Truck':
      return <Truck className={className} />;
    case 'HeartHandshake':
      return <HeartHandshake className={className} />;
    default:
      return <Briefcase className={className} />;
  }
};
