import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { GalleryItem } from '../../types';

interface LightboxProps {
  isOpen: boolean;
  currentItem: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onSelect: (item: GalleryItem) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  currentItem,
  items,
  onClose,
  onSelect,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !currentItem) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentItem, items]);

  if (!isOpen || !currentItem) return null;

  const currentIndex = items.findIndex(item => item.id === currentItem.id);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % items.length;
    onSelect(items[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + items.length) % items.length;
    onSelect(items[prevIdx]);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={currentItem.title}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content Container */}
      <div className="max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col">
        {/* Visual Showcase Card */}
        <div className="relative aspect-16/10 sm:aspect-16/9 bg-gradient-to-br from-slate-800 to-slate-950 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mb-4 text-teal-300">
            <Info className="w-8 h-8" />
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-teal-900/60 text-teal-300 border border-teal-700/50 mb-3">
            {currentItem.category}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white max-w-xl">
            {currentItem.title}
          </h3>
          <p className="text-sm text-slate-300 max-w-lg mt-2 leading-relaxed">
            {currentItem.description}
          </p>
          <div className="mt-6 text-xs text-slate-400 border border-dashed border-slate-700 rounded-lg px-4 py-2 bg-slate-900/60">
            📸 Client Photography Placeholder: Replace with high-resolution photo of your actual {currentItem.category.toLowerCase()}.
          </div>
        </div>

        {/* Footer info in lightbox */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Image {currentIndex + 1} of {items.length}</span>
          <button 
            onClick={onClose}
            className="text-teal-400 hover:text-teal-300 font-medium"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
