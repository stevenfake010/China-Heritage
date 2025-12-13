import React, { useEffect } from 'react';
import { HeritageSite } from '../types';
import { X, Share2, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CelebrationModalProps {
  site: HeritageSite;
  onClose: () => void;
}

const CelebrationModal: React.FC<CelebrationModalProps> = ({ site, onClose }) => {
  
  useEffect(() => {
    // 1. Fire Confetti immediately on mount
    const duration = 3000;
    const end = Date.now() + duration;

    // Golden and Red colors for premium/chinese feel
    const colors = ['#d97706', '#dc2626', '#fcd34d', '#ffffff']; 

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    // 2. A big burst in the center after a slight delay
    setTimeout(() => {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: colors,
            disableForReducedMotion: true
        });
    }, 400);

  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/80 backdrop-blur-md transition-opacity duration-500 animate-in fade-in"
        onClick={onClose}
      />

      {/* Card Container */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 animate-in zoom-in-95 slide-in-from-bottom-4">
        
        {/* Close Button */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-colors"
        >
            <X size={20} />
        </button>

        {/* Image Section */}
        <div className="relative aspect-[4/3] w-full">
            <img 
                src={site.imageUrl} 
                alt={site.name} 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-transparent to-transparent"></div>
            
            {/* Stamp Effect */}
            <div className="absolute bottom-8 right-8 z-10 stamp-animate pointer-events-none select-none">
                <div className="w-24 h-24 border-[3px] border-red-700 rounded-full flex items-center justify-center relative opacity-90 rotate-[-15deg]">
                    <div className="absolute inset-1 border border-red-700 rounded-full"></div>
                    <div className="text-center">
                        <div className="text-red-700 font-serif font-bold text-xs tracking-widest uppercase">Visited</div>
                        <div className="text-red-700 font-serif font-bold text-lg">打卡留念</div>
                        <div className="text-red-700 text-[10px] font-mono">{new Date().toLocaleDateString()}</div>
                    </div>
                </div>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
                    <span className="w-8 h-[1px] bg-amber-400"></span>
                    探索新发现
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold leading-tight drop-shadow-md">
                    {site.name}
                </h2>
            </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8 bg-white relative">
            {/* Ornamental Corners */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-stone-200"></div>
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-stone-200"></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-stone-200"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-stone-200"></div>

            <div className="text-center space-y-4">
                <p className="text-stone-500 font-serif italic text-lg leading-relaxed">
                    {site.description}
                </p>
                
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-stone-100">
                    <div className="flex flex-col items-center text-stone-400">
                        <span className="text-xs uppercase tracking-wider">Province</span>
                        <span className="font-serif text-stone-800 font-bold">{site.province}</span>
                    </div>
                    <div className="w-px h-8 bg-stone-200"></div>
                    <div className="flex flex-col items-center text-stone-400">
                        <span className="text-xs uppercase tracking-wider">Category</span>
                        <span className="font-serif text-stone-800 font-bold">{site.category}</span>
                    </div>
                    <div className="w-px h-8 bg-stone-200"></div>
                    <div className="flex flex-col items-center text-stone-400">
                        <span className="text-xs uppercase tracking-wider">Year</span>
                        <span className="font-serif text-stone-800 font-bold">{site.yearInscribed}</span>
                    </div>
                </div>

                <button 
                    onClick={onClose}
                    className="mt-6 w-full py-3 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 transition-all shadow-lg active:scale-95"
                >
                    收入囊中
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CelebrationModal;