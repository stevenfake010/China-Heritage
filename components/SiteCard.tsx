import React from 'react';
import { HeritageSite } from '../types';
import { Check, MapPin, Mountain, Landmark } from 'lucide-react';

interface SiteCardProps {
  site: HeritageSite;
  isVisited: boolean;
  onToggleVisit: (id: string) => void;
}

const SiteCard: React.FC<SiteCardProps> = ({ site, isVisited, onToggleVisit }) => {
  return (
    <div className={`
      relative overflow-hidden rounded-xl border transition-all duration-300 group
      ${isVisited 
        ? 'bg-emerald-50 border-emerald-200 shadow-md' 
        : 'bg-white border-stone-200 hover:shadow-lg hover:border-stone-300'}
    `}>
      {/* Image Header */}
      <div className="h-44 overflow-hidden relative">
        <img 
          src={site.imageUrl} 
          alt={site.name} 
          className={`w-full h-full object-cover transition-transform duration-700 ${isVisited ? 'grayscale-0' : 'grayscale group-hover:grayscale-0 group-hover:scale-105'}`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
          <div>
            <span className="text-xs font-bold text-white/95 bg-stone-900/40 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
              {site.province}
            </span>
          </div>
        </div>
        
        {/* Toggle Button */}
        <button
          onClick={() => onToggleVisit(site.id)}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-lg transition-all duration-300 transform active:scale-95
            ${isVisited 
              ? 'bg-red-600 text-white rotate-0' 
              : 'bg-white/90 text-stone-400 hover:text-red-600 rotate-0 hover:rotate-12'}
          `}
          title={isVisited ? "标记为未去过" : "打卡"}
        >
          <Check size={20} className={isVisited ? "stroke-[3px]" : "stroke-[2px]"} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2 min-h-[3.5rem]">
            <h3 className="font-serif font-bold text-stone-800 text-lg leading-tight pr-4">
              {site.name}
            </h3>
        </div>
        
        <div className="flex items-center gap-2 mb-3 text-xs text-stone-500 font-medium">
           {site.category === '自然遗产' && <Mountain size={14} className="text-emerald-600" />}
           {site.category === '文化遗产' && <Landmark size={14} className="text-amber-700" />}
           {site.category === '混合遗产' && <div className="flex text-indigo-600"><Landmark size={14}/><Mountain size={14}/></div>}
           <span>{site.category} • {site.yearInscribed}年列入</span>
        </div>

        <p className="text-sm text-stone-600 line-clamp-3 mb-4 leading-relaxed text-justify">
          {site.description}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-end border-t border-stone-100 pt-3">
          <div className="flex items-center text-xs text-stone-400 font-mono">
            <MapPin size={12} className="mr-1" />
            {site.coordinates[1].toFixed(2)}°N, {site.coordinates[0].toFixed(2)}°E
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteCard;