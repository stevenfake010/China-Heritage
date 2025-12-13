import React, { useState, useEffect, useMemo } from 'react';
import ChinaMap from './components/ChinaMap';
import SiteCard from './components/SiteCard';
import { HERITAGE_SITES } from './constants';
import { Search, Trophy, Map as MapIcon, Grid, Flag } from 'lucide-react';

const App: React.FC = () => {
  // --- State ---
  const [visited, setVisited] = useState<Set<string>>(() => {
    // Initialize from localStorage
    const saved = localStorage.getItem('visitedSites');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [filter, setFilter] = useState<'all' | 'visited' | 'unvisited'>('all');
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'map' | 'grid'>('map'); // Mobile view toggle

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
      
      if (filter === 'visited') return matchesSearch && isVisited;
      if (filter === 'unvisited') return matchesSearch && !isVisited;
      return matchesSearch;
    });
  }, [search, visited, filter]);

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

          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
                <div className="text-sm font-medium text-stone-600">
                    打卡进度
                </div>
                <div className="text-lg font-bold font-serif text-emerald-700">
                    {stats.visited} <span className="text-stone-400 text-base font-sans font-normal">/ {stats.total}</span>
                </div>
            </div>
            
            {/* Progress Bar (Circular or Linear) */}
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
                 <span className="absolute text-[10px] font-bold text-stone-700">{stats.percentage}%</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* --- Map Section --- */}
        <section className={`bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-white ${view === 'grid' ? 'hidden md:block' : 'block'}`}>
            <ChinaMap visitedSiteIds={visited} onSiteClick={toggleVisit} />
        </section>

        {/* --- Controls Section --- */}
        <section className="flex flex-col md:flex-row gap-4 items-center justify-between sticky top-24 z-30 bg-stone-100/95 py-4 backdrop-blur-sm -mx-4 px-4 md:mx-0 md:px-0">
            {/* View Toggle (Mobile) */}
            <div className="flex md:hidden bg-white rounded-lg p-1 shadow-sm border border-stone-200">
                <button 
                    onClick={() => setView('map')}
                    className={`p-2 rounded ${view === 'map' ? 'bg-stone-100 text-stone-900' : 'text-stone-400'}`}
                >
                    <MapIcon size={20} />
                </button>
                <button 
                    onClick={() => setView('grid')}
                    className={`p-2 rounded ${view === 'grid' ? 'bg-stone-100 text-stone-900' : 'text-stone-400'}`}
                >
                    <Grid size={20} />
                </button>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={18} />
                <input 
                    type="text" 
                    placeholder="搜索遗产地或省份..." 
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none transition-all shadow-sm bg-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Filter Tabs */}
            <div className="flex bg-white rounded-xl p-1 shadow-sm border border-stone-200 overflow-x-auto w-full md:w-auto">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex-1 md:flex-none
                        ${filter === 'all' ? 'bg-stone-800 text-white shadow-md' : 'text-stone-500 hover:bg-stone-50'}`}
                >
                    全部
                </button>
                <button
                    onClick={() => setFilter('visited')}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex-1 md:flex-none
                        ${filter === 'visited' ? 'bg-emerald-600 text-white shadow-md' : 'text-stone-500 hover:bg-stone-50'}`}
                >
                    已打卡
                </button>
                <button
                    onClick={() => setFilter('unvisited')}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex-1 md:flex-none
                        ${filter === 'unvisited' ? 'bg-amber-600 text-white shadow-md' : 'text-stone-500 hover:bg-stone-50'}`}
                >
                    未去过
                </button>
            </div>
        </section>

        {/* --- List Section --- */}
        <section className={`${view === 'map' ? 'hidden md:grid' : 'grid'} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`}>
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
    </div>
  );
};

export default App;