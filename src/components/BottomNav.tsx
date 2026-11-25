import React from 'react';
import { useDirectory } from '../context/DirectoryContext';
import { MainTab } from '../types';
import { Home, ShoppingBag, Megaphone, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, setIsRegisterModalOpen } = useDirectory();

  const handleTabClick = (tab: MainTab) => {
    setActiveTab(tab);
    if (tab === 'registro') {
      setIsRegisterModalOpen(true);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { id: MainTab; label: string; icon: React.ReactNode; badgeText?: string }[] = [
    {
      id: 'inicio',
      label: 'Inicio',
      icon: <Home className="w-5 h-5" />
    },
    {
      id: 'emprendedores',
      label: 'Emprendedores',
      icon: <ShoppingBag className="w-5 h-5" />
    },
    {
      id: 'registro',
      label: 'Registra tu negocio',
      icon: <Megaphone className="w-5 h-5" />
    },
    {
      id: 'perfil',
      label: 'Mi perfil',
      icon: <User className="w-5 h-5" />
    }
  ];

  return (
    <nav
      aria-label="Menú principal de navegación"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
    >
      <div className="max-w-md md:max-w-xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const isRegister = item.id === 'registro';

            if (isRegister) {
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className="flex flex-col items-center justify-center -mt-5 group focus:outline-none"
                  title="Registra tu negocio o liderazgo comunal"
                >
                  <div className="w-12 h-12 rounded-full bg-[#C8102E] hover:bg-[#8E1220] active:scale-95 text-white flex items-center justify-center shadow-md transition-all border-3 border-white">
                    <Megaphone className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-[#C8102E] mt-0.5 tracking-tight truncate max-w-[85px]">
                    Registra
                  </span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-lg transition-colors focus:outline-none ${
                  isActive
                    ? 'text-[#C8102E] font-bold'
                    : 'text-[#2B2B2B]/70 hover:text-[#C8102E]'
                }`}
              >
                <div
                  className={`p-1 rounded-md transition-all ${
                    isActive ? 'scale-110 text-[#C8102E]' : 'text-stone-500'
                  }`}
                >
                  {item.icon}
                </div>
                <span className="text-[11px] font-medium leading-tight truncate">
                  {item.label}
                </span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-[#C8102E] mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
