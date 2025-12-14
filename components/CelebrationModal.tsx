import React, { useEffect } from 'react';
import { HeritageSite } from '../types';
import { X, Download, MapPin, Quote } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CelebrationModalProps {
  site: HeritageSite;
  onClose: () => void;
}

const CelebrationModal: React.FC<CelebrationModalProps> = ({ site, onClose }) => {
  
  useEffect(() => {
    // 1. Fire Confetti immediately on mount
    const duration = 1500; // Reduced from 3000ms to 1500ms
    const end = Date.now() + duration;

    // Golden and Red colors for premium/chinese feel
    const colors = ['#b45309', '#dc2626', '#fcd34d', '#f5f5f4']; 

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

    // 2. A big burst in the center after the card settles
    setTimeout(() => {
        confetti({
            particleCount: 120,
            spread: 100,
            origin: { y: 0.65 },
            colors: colors,
            gravity: 0.8,
            scalar: 1.1,
            disableForReducedMotion: true
        });
    }, 500);

  }, []);

  const today = new Date();
  const dateStr = `${today.getFullYear()}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getDate().toString().padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 perspective-1000">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/70 backdrop-blur-sm transition-opacity duration-500 animate-in fade-in"
        onClick={onClose}
      />

      {/* Postcard Container - 3D entrance animation */}
      <div className="relative w-full max-w-[420px] transform transition-all duration-700 animate-in zoom-in-90 slide-in-from-bottom-8 rotate-1 hover:rotate-0">
        
        {/* Close Button (Floating outside) */}
        <button 
            onClick={onClose}
            className="absolute -top-12 right-0 md:-right-12 z-20 p-2 text-white/80 hover:text-white transition-colors"
        >
            <X size={24} />
            <span className="sr-only">关闭</span>
        </button>

        {/* The Postcard */}
        <div className="bg-[#fcfbf9] rounded-sm shadow-2xl overflow-hidden relative">
            
            {/* Paper Texture Overlay (Subtle noise) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            {/* --- Postcard Content --- */}
            <div className="p-3 pb-0">
                {/* Photo Area with White Border */}
                <div className="bg-white p-2 shadow-sm border border-stone-100 relative">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-200">
                        <img 
                            src={site.imageUrl} 
                            alt={site.name} 
                            className="w-full h-full object-cover sepia-[0.1] contrast-[1.05]"
                        />
                        {/* Inner shadow/vignette for photo realism */}
                        <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] pointer-events-none"></div>
                        
                        {/* "Photo Taken" Location Tag */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[10px] text-white/90 font-medium tracking-wider bg-black/40 backdrop-blur-[2px] px-2 py-1 rounded-full border border-white/20">
                            <MapPin size={10} />
                            CN • {site.province}
                        </div>
                    </div>
                </div>
            </div>

            {/* Text Area */}
            <div className="px-6 py-6 relative">
                
                {/* 1. The Red Stamp (Animated) */}
                <div className="absolute top-[-20px] right-6 z-20 stamp-animate pointer-events-none select-none mix-blend-multiply">
                    <div className="w-24 h-24 border-4 border-double border-red-800/80 rounded-full flex items-center justify-center relative opacity-90 rotate-[-12deg] bg-red-50/10 backdrop-blur-[1px]">
                        <div className="absolute inset-1 border border-red-800/50 rounded-full"></div>
                        <div className="text-center">
                            <div className="text-red-800 font-serif font-bold text-[10px] tracking-[0.2em] uppercase mb-1">China Heritage</div>
                            <div className="text-red-900 font-serif font-bold text-xl leading-none">打卡<br/>留念</div>
                            <div className="text-red-800 text-[10px] font-mono mt-1 pt-1 border-t border-red-800/30 w-12 mx-auto">{dateStr}</div>
                        </div>
                    </div>
                </div>

                {/* 2. The Black Postmark (Faded) */}
                <div className="absolute top-0 right-[40%] z-10 opacity-40 rotate-12 pointer-events-none mix-blend-multiply">
                    <div className="w-16 h-16 border border-stone-800 rounded-full flex items-center justify-center">
                         <div className="text-[8px] text-stone-900 font-mono text-center leading-tight">
                            POSTAGE<br/>PAID<br/>CN-{site.id}
                         </div>
                    </div>
                    <div className="absolute top-1/2 left-16 w-12 h-[2px] bg-stone-800/80 wave-line"></div>
                    <div className="absolute top-[40%] left-16 w-12 h-[2px] bg-stone-800/80 wave-line"></div>
                    <div className="absolute top-[60%] left-16 w-12 h-[2px] bg-stone-800/80 wave-line"></div>
                </div>

                <div className="space-y-4">
                    {/* Header Info */}
                    <div className="pr-20">
                        <div className="flex items-center gap-2 mb-1">
                             <span className="px-1.5 py-0.5 bg-stone-800 text-stone-100 text-[9px] font-bold tracking-widest uppercase rounded-sm">
                                No.{site.id}
                             </span>
                             <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                                World Heritage
                             </span>
                        </div>
                        <h2 className="text-2xl font-serif font-bold text-stone-900 leading-tight">
                            {site.name}
                        </h2>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-stone-200 dashed-line"></div>

                    {/* Quote */}
                    <div className="relative pl-4">
                        <Quote size={16} className="absolute left-0 top-0 text-stone-300 transform -scale-x-100" />
                        <p className="font-serif italic text-stone-600 text-sm leading-relaxed">
                            {site.description}
                        </p>
                    </div>

                    {/* Footer Metadata */}
                    <div className="pt-4 flex items-end justify-between">
                         <div className="flex flex-col gap-0.5">
                             <span className="text-[9px] text-stone-400 uppercase tracking-widest">Inscribed</span>
                             <span className="font-serif text-stone-800 font-bold">{site.yearInscribed} 年</span>
                         </div>
                         <div className="flex flex-col gap-0.5 border-l border-stone-200 pl-4">
                             <span className="text-[9px] text-stone-400 uppercase tracking-widest">Type</span>
                             <span className="font-serif text-stone-800 font-bold">{site.category}</span>
                         </div>
                         <div className="flex-1"></div>
                         
                         {/* Action Button - Styled as part of the card */}
                         <button 
                            onClick={onClose}
                            className="bg-stone-900 hover:bg-red-900 text-white text-xs px-4 py-2 rounded shadow-md transition-colors flex items-center gap-2"
                        >
                            <span>收入囊中</span>
                            <Download size={12} />
                         </button>
                    </div>
                </div>
            </div>

            {/* Bottom Decorative Bar code strip */}
            <div className="bg-stone-100 h-3 w-full border-t border-stone-200 flex items-center justify-between px-2 overflow-hidden">
                <div className="flex gap-0.5 opacity-20">
                     {[...Array(40)].map((_, i) => (
                        <div key={i} className="w-[2px] bg-stone-900 h-full" style={{ height: Math.random() > 0.5 ? '100%' : '60%' }}></div>
                     ))}
                </div>
                <span className="text-[8px] font-mono text-stone-400">MEMORY-{site.id.padStart(4, '0')}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CelebrationModal;