import React from 'react';
import { HeritageSite } from '../types';
import { Check, MapPin } from 'lucide-react';

interface SiteCardProps {
  site: HeritageSite;
  isVisited: boolean;
  onToggleVisit: (id: string) => void;
}

const SiteCard: React.FC<SiteCardProps> = ({ site, isVisited, onToggleVisit }) => {
  return (
    <div className={`
      relative overflow-hidden rounded-xl border transition-all duration-300 group flex flex-col
      ${isVisited 
        ? 'bg-emerald-50/50 border-emerald-200 shadow-sm' 
        : 'bg-white border-stone-200 hover:shadow-md hover:border-stone-300'}
    `}>
      {/* Image Header - Aspect Square (1:1) */}
      <div className="relative aspect-square w-full overflow-hidden">
        <img 
          src={site.imageUrl} 
          alt={site.name} 
          className={`w-full h-full object-cover transition-transform duration-700 ${isVisited ? 'grayscale-0' : 'grayscale group-hover:grayscale-0 group-hover:scale-105'}`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
        
        {/* Province Tag over Image */}
        <div className="absolute bottom-2 left-2">
            <span className="text-[10px] font-bold text-white/90 bg-black/30 px-1.5 py-0.5 rounded border border-white/10 backdrop-blur-[2px]">
              {site.province}
            </span>
        </div>
        
        {/* Toggle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisit(site.id);
          }}
          className={`absolute top-2 right-2 p-1.5 rounded-full shadow-sm transition-all duration-300 transform active:scale-95
            ${isVisited 
              ? 'bg-red-600 text-white rotate-0' 
              : 'bg-white/90 text-stone-400 hover:text-red-600 rotate-0 hover:rotate-12'}
          `}
        >
          <Check size={14} className={isVisited ? "stroke-[3px]" : "stroke-[2px]"} />
        </button>
      </div>

      {/* Content - Simplified */}
      <div className="p-3 flex flex-col flex-1 justify-between">
        <div>
            <h3 className="font-serif font-bold text-stone-800 text-sm leading-tight mb-2 line-clamp-1">
              {site.name}
            </h3>
            
            {/* Poem/Quote Description - Smaller and Grayer */}
            <p className="text-xs text-stone-400 font-serif leading-relaxed line-clamp-2">
              {site.description}
            </p>
        </div>
        
        {/* Minimal Location Info */}
        <div className="flex items-center justify-end mt-2 pt-2 border-t border-stone-100/50">
           <div className="flex items-center text-[10px] text-stone-300 font-mono">
            <MapPin size={10} className="mr-0.5" />
            {site.yearInscribed}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteCard;