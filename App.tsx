import React, { useState, useEffect, useMemo } from 'react';
import ChinaMap from './components/ChinaMap';
import SiteCard from './components/SiteCard';
import StatisticsModal from './components/StatisticsModal';
import { HERITAGE_SITES } from './constants';
import { Search, Trophy, Flag, CheckCircle2, CircleDashed, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  // --- State ---
  const [visited, setVisited] = useState<Set<string>>(() => {
    // Initialize from localStorage
    const saved = localStorage.getItem('visitedSites');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Filter for UNVISITED sites by default logic from previous request? 
  // User asked for "Show Unvisited" button previously.
  const [showUnvisitedOnly, setShowUnvisitedOnly] = useState(false);
  const [search, setSearch] = useState('');
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  
  // --- Effects ---
  useEffect(() => {
    // Persistence
    localStorage.setItem('visitedSites', JSON.stringify(Array.from(visited)));
  }, [visited]);

  // --- Handlers ---
  const toggleVisit = (id: string) => {
    setVisited((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // --- Derived Data ---
  const filteredSites = useMemo(() => {
    return HERITAGE_SITES.filter((site) => {
      const matchesSearch = site.name.includes(search) || 
                            site.province.includes(search) ||
                            site.description.includes(search);
      const isVisited = visited.has(site.id);
      
      // If filtering for unvisited, exclude visited sites
      if (showUnvisitedOnly) return matchesSearch && !isVisited;
      
      return matchesSearch;
    });
  }, [search, visited, showUnvisitedOnly]);

  const stats = {
    total: HERITAGE_SITES.length,
    visited: visited.size,
    percentage: Math.round((visited.size / HERITAGE_SITES.length) * 100)
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 pb-12 font-sans">
      {/* --- Header --- */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-800 text-white p-2 rounded-lg shadow-sm">
                <Trophy size={20} />
            </div>
            <div>
                <h1 className="text-xl font-serif font-bold tracking-tight text-stone-900">
                世界遗产足迹
                </h1>
                <p className="text-xs text-stone-500 uppercase tracking-widest font-semibold">
                    中国名录 • 共{stats.total}项
                </p>
            </div>
          </div>

          {/* Stats Trigger */}
          <div 
            className="flex items-center gap-6 cursor-pointer group p-2 -mr-2 rounded-xl hover:bg-stone-50 transition-all"
            onClick={() => setIsStatsOpen(true)}
            title="查看详细统计"
          >
            <div className="hidden md:flex flex-col items-end">
                <div className="text-sm font-medium text-stone-600 flex items-center gap-1 group-hover:text-stone-900">
                    打卡进度 <ChevronRight size={14} className="text-stone-400 group-hover:text-stone-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-lg font-bold font-serif text-emerald-700">
                    {stats.visited} <span className="text-stone-400 text-base font-sans font-normal">/ {stats.total}</span>
                </div>
            </div>
            
            {/* Progress Bar (Circular) */}
            <div className="w-12 h-12 relative flex items-center justify-center">
                 <svg className="w-full h-full transform -rotate-90">
                    <circle cx="24" cy="24" r="20" stroke="#e7e5e4" strokeWidth="4" fill="transparent" />
                    <circle 
                        cx="24" cy="24" r="20" 
                        stroke="#059669" strokeWidth="4" fill="transparent"
                        strokeDasharray={125.6}
                        strokeDashoffset={125.6 - (125.6 * stats.percentage / 100)}
                        className="transition-all duration-1000 ease-out"
                    />
                 </svg>
                 <span className="absolute text-[10px] font-bold text-stone-700 group-hover:text-stone-900">{stats.percentage}%</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* --- Map Section --- */}
        <section className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-white block mb-6">
            <ChinaMap visitedSiteIds={visited} onSiteClick={toggleVisit} />
        </section>

        {/* --- Controls Section --- */}
        <section className="flex flex-col md:flex-row gap-3 items-center justify-between sticky top-24 z-30 bg-stone-100/95 py-2 backdrop-blur-sm -mx-4 px-4 md:mx-0 md:px-0 mb-6">
            {/* Search */}
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={16} />
                <input 
                    type="text" 
                    placeholder="搜索遗产地或省份..." 
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 focus:ring-1 focus:ring-red-200 focus:border-red-400 outline-none transition-all shadow-sm bg-white text-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Filter Toggle Button */}
            <button
                onClick={() => setShowUnvisitedOnly(!showUnvisitedOnly)}
                className={`w-full md:w-auto px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 border shadow-sm
                    ${showUnvisitedOnly 
                        ? 'bg-stone-800 text-white border-stone-800' 
                        : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'}`}
            >
                {showUnvisitedOnly ? <CircleDashed size={16} className="text-white" /> : <CheckCircle2 size={16} className="text-stone-400" />}
                {showUnvisitedOnly ? '已过滤：只看未打卡' : '只看未打卡'}
            </button>
        </section>

        {/* --- List Section --- */}
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {filteredSites.length > 0 ? (
                filteredSites.map((site) => (
                    <SiteCard 
                        key={site.id} 
                        site={site} 
                        isVisited={visited.has(site.id)} 
                        onToggleVisit={toggleVisit}
                    />
                ))
            ) : (
                <div className="col-span-full py-12 text-center text-stone-400 flex flex-col items-center">
                    <Flag size={48} className="mb-4 opacity-20" />
                    <p className="text-lg font-serif">未找到相关遗产地</p>
                </div>
            )}
        </section>

      </main>

      {/* Statistics Modal */}
      {isStatsOpen && (
        <StatisticsModal 
          visited={visited} 
          onClose={() => setIsStatsOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;