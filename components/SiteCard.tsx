import React, { useState } from 'react';
import { HeritageSite } from '../types';
import { Check, MapPin, Mountain, Landmark, Loader2, Sparkles, X } from 'lucide-react';
import { generateSiteDescription } from '../services/gemini';

interface SiteCardProps {
  site: HeritageSite;
  isVisited: boolean;
  onToggleVisit: (id: string) => void;
}

const SiteCard: React.FC<SiteCardProps> = ({ site, isVisited, onToggleVisit }) => {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  const handleGetInsight = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (aiInsight) return; // Already loaded
    
    setAiLoading(true);
    const text = await generateSiteDescription(site.name);
    setAiInsight(text);
    setAiLoading(false);
  };

  return (
    <div className={`
      relative overflow-hidden rounded-xl border transition-all duration-300 group
      ${isVisited 
        ? 'bg-emerald-50 border-emerald-200 shadow-md' 
        : 'bg-white border-stone-200 hover:shadow-lg hover:border-stone-300'}
    `}>
      {/* Image Header */}
      <div className="h-40 overflow-hidden relative">
        <img 
          src={site.imageUrl} 
          alt={site.name} 
          className={`w-full h-full object-cover transition-transform duration-700 ${isVisited ? 'grayscale-0' : 'grayscale group-hover:grayscale-0 group-hover:scale-105'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <div>
            <span className="text-xs font-bold text-white/90 bg-black/30 px-2 py-0.5 rounded backdrop-blur-sm">
              {site.province}
            </span>
          </div>
        </div>
        
        {/* Toggle Button */}
        <button
          onClick={() => onToggleVisit(site.id)}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-lg transition-all duration-300 transform active:scale-95
            ${isVisited 
              ? 'bg-emerald-500 text-white rotate-0' 
              : 'bg-white/90 text-stone-400 hover:text-emerald-500 rotate-0 hover:rotate-12'}
          `}
          title={isVisited ? "Mark as unvisited" : "Check in"}
        >
          <Check size={20} className={isVisited ? "stroke-[3px]" : "stroke-[2px]"} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
            <h3 className="font-serif font-bold text-stone-800 leading-tight pr-4">
              {site.name}
            </h3>
        </div>
        
        <div className="flex items-center gap-2 mb-3 text-xs text-stone-500">
           {site.category === 'Natural' && <Mountain size={14} />}
           {site.category === 'Cultural' && <Landmark size={14} />}
           {site.category === 'Mixed' && <div className="flex"><Landmark size={14}/><Mountain size={14}/></div>}
           <span>{site.category} Heritage • {site.yearInscribed}</span>
        </div>

        <p className="text-sm text-stone-600 line-clamp-2 mb-4">
          {site.description}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-stone-100 pt-3">
          <button 
            className="flex items-center text-xs text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
            onClick={handleGetInsight}
            disabled={aiLoading}
          >
            {aiLoading ? (
              <Loader2 size={14} className="animate-spin mr-1" />
            ) : (
              <Sparkles size={14} className="mr-1" />
            )}
            {aiInsight ? 'Insight Loaded' : 'AI Insight'}
          </button>
          
          <div className="flex items-center text-xs text-stone-400">
            <MapPin size={12} className="mr-1" />
            {site.coordinates[1].toFixed(2)}, {site.coordinates[0].toFixed(2)}
          </div>
        </div>

        {/* AI Insight Expandable Area */}
        {aiInsight && (
          <div className="mt-3 bg-indigo-50 p-3 rounded-lg text-xs text-indigo-900 leading-relaxed relative animate-fadeIn">
            <button 
                onClick={(e) => { e.stopPropagation(); setAiInsight(null); }}
                className="absolute top-1 right-1 text-indigo-400 hover:text-indigo-700"
            >
                <X size={12} />
            </button>
            <p className="font-semibold mb-1 flex items-center gap-1">
                <Sparkles size={10} /> Gemini Insight:
            </p>
            {aiInsight}
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteCard;
