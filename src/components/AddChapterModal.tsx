import React, { useState } from 'react';
import { useDirectory } from '../context/DirectoryContext';
import { ChapterIcon } from './ChapterIcon';
import { X, Plus, FolderPlus } from 'lucide-react';

const ICON_OPTIONS = [
  { name: 'ShieldCheck', label: 'Comunal / ADI' },
  { name: 'Users', label: 'Comité / Vecinos' },
  { name: 'Award', label: 'Liderazgo' },
  { name: 'Car', label: 'Automotriz' },
  { name: 'Hammer', label: 'Construcción' },
  { name: 'Paintbrush', label: 'Pintura' },
  { name: 'Store', label: 'Comercio' },
  { name: 'UtensilsCrossed', label: 'Comidas' },
  { name: 'Scissors', label: 'Artesanías' },
  { name: 'Wrench', label: 'Servicios' },
  { name: 'Zap', label: 'Electricidad' },
  { name: 'Truck', label: 'Transporte' }
];

export const AddChapterModal: React.FC = () => {
  const { isAddChapterModalOpen, setIsAddChapterModalOpen, addChapter } = useDirectory();

  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [icon, setIcon] = useState('Briefcase');
  const [description, setDescription] = useState('');
  const [tagline, setTagline] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAddChapterModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !shortName.trim()) {
      setErrorMsg('Por favor completa el nombre completo y nombre corto del capítulo.');
      return;
    }

    addChapter({
      name: name.trim(),
      shortName: shortName.trim(),
      icon,
      description: description.trim() || `Capítulo dedicado a ${name.trim()} y servicios relacionados.`,
      tagline: tagline.trim() || `Profesionales y emprendimientos de ${shortName.trim()}`
    });

    setName('');
    setShortName('');
    setDescription('');
    setTagline('');
    setErrorMsg('');
    setIsAddChapterModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div
        className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-stone-200 my-8 text-[#2B2B2B] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#C8102E] text-white px-6 py-4 flex items-center justify-between border-b border-[#8E1220]">
          <div className="flex items-center gap-2">
            <FolderPlus className="w-5 h-5 text-white" />
            <h2 className="text-base sm:text-lg font-bold">Crear Nuevo Capítulo / Oficio</h2>
          </div>
          <button
            onClick={() => setIsAddChapterModalOpen(false)}
            className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-2.5 bg-red-100 text-red-800 rounded-xl text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
              Nombre Completo del Capítulo *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!shortName) setShortName(e.target.value);
              }}
              placeholder="Ej. Mecánica Rápida & Motos"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-[#C8102E] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
              Nombre Corto para la Pestaña *
            </label>
            <input
              type="text"
              required
              value={shortName}
              onChange={(e) => setShortName(e.target.value)}
              placeholder="Ej. Mecánicos"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-[#C8102E] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
              Ícono del Capítulo
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 pt-1">
              {ICON_OPTIONS.map((item) => (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => setIcon(item.name)}
                  className={`p-2 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
                    icon === item.name
                      ? 'border-[#C8102E] bg-[#C8102E]/10 text-[#C8102E] ring-1 ring-[#C8102E]'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  <ChapterIcon name={item.name} className="w-4 h-4" />
                  <span className="text-[10px] truncate max-w-full">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2B2B2B] mb-1">
              Descripción del Capítulo
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej. Talleres de servicio rápido, cambio de aceite y afinado."
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-[#C8102E] focus:bg-white"
            />
          </div>

          <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddChapterModalOpen(false)}
              className="px-3 py-2 text-xs text-stone-600 hover:text-stone-900"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 bg-[#C8102E] hover:bg-[#8E1220] active:scale-95 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Crear Capítulo</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
