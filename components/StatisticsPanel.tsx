import React, { useMemo } from 'react';
import { Category } from '../types';
import { HERITAGE_SITES } from '../constants';
import { Palmtree, Scroll, Mountain, Map, Trophy, BarChart3, TrendingUp } from 'lucide-react';

interface StatisticsPanelProps {
  visited: Set<string>;
}

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ visited }) => {
  // --- Analytics ---
  const stats = useMemo(() => {
    // 1. Category Stats
    const categories: Record<Category, { total: number; visited: number }> = {
      '文化遗产': { total: 0, visited: 0 },
      '自然遗产': { total: 0, visited: 0 },
      '混合遗产': { total: 0, visited: 0 },
    };

    // 2. Province Stats
    const provinceMap: Record<string, { total: number; visited: number }> = {};

    HERITAGE_SITES.forEach((site) => {
      // Category
      if (categories[site.category]) {
        categories[site.category].total += 1;
        if (visited.has(site.id)) {
          categories[site.category].visited += 1;
        }
      }

      // Province
      const prov = site.province;
      if (!provinceMap[prov]) {
        provinceMap[prov] = { total: 0, visited: 0 };
      }
      provinceMap[prov].total += 1;
      if (visited.has(site.id)) {
        provinceMap[prov].visited += 1;
      }
    });

    // Sort provinces
    const sortedProvinces = Object.entries(provinceMap)
      .sort(([, a], [, b]) => {
        if (b.visited !== a.visited) return b.visited - a.visited; // Visited count desc
        return b.total - a.total;
      })
      .slice(0, 10); // Top 10

    return { categories, sortedProvinces };
  }, [visited]);

  const getCategoryIcon = (cat: Category) => {
    switch (cat) {
      case '文化遗产': return <Scroll size={18} className="text-amber-600" />;
      case '自然遗产': return <Palmtree size={18} className="text-emerald-600" />;
      case '混合遗产': return <Mountain size={18} className="text-indigo-600" />;
    }
  };

  const getCategoryColor = (cat: Category) => {
    switch (cat) {
      case '文化遗产': return 'bg-amber-500';
      case '自然遗产': return 'bg-emerald-500';
      case '混合遗产': return 'bg-indigo-500';
    }
  };

  const totalPercentage = Math.round((visited.size / HERITAGE_SITES.length) * 100);

  return (
    <section className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-white mb-6">
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-stone-100 rounded-lg text-stone-600">
                <BarChart3 size={20} />
            </div>
            <h2 className="text-lg font-serif font-bold text-stone-800 tracking-tight">
                探索数据统计
            </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
            
            {/* 1. Global Progress Card (2 cols) */}
            <div className="lg:col-span-2 bg-stone-900 rounded-2xl p-6 text-white relative overflow-hidden flex flex-col justify-between min-h-[140px] shadow-sm group">
                {/* Background Decor */}
                <Map className="absolute -bottom-4 -right-4 text-white opacity-5 w-32 h-32 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-3xl -mr-10 -mt-10"></div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-stone-400 text-xs font-bold uppercase tracking-wider mb-1">
                        <Trophy size={14} /> 总体进度
                    </div>
                    <div className="text-4xl font-serif font-bold text-white mb-1">
                        {totalPercentage}%
                    </div>
                    <div className="text-stone-400 text-sm">
                        已探索 <span className="text-white font-bold">{visited.size}</span> / {HERITAGE_SITES.length} 处遗产
                    </div>
                </div>

                <div className="relative z-10 w-full bg-white/10 h-1.5 rounded-full mt-4 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${totalPercentage}%` }}></div>
                </div>
            </div>

            {/* 2. Category Cards (1 col each = 3 cols) */}
            {(Object.keys(stats.categories) as Category[]).map((cat) => {
                const data = stats.categories[cat];
                const percent = data.total > 0 ? Math.round((data.visited / data.total) * 100) : 0;
                
                return (
                  <div key={cat} className="bg-stone-50 hover:bg-stone-100 transition-colors rounded-2xl p-5 border border-stone-100 flex flex-col justify-between group">
                    <div className="flex justify-between items-start mb-2">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                            {getCategoryIcon(cat)}
                        </div>
                        <span className="text-2xl font-bold text-stone-800">{percent}<span className="text-sm text-stone-400 font-medium">%</span></span>
                    </div>
                    
                    <div>
                        <div className="text-sm font-bold text-stone-700 mb-2">{cat}</div>
                        <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-1000 ${getCategoryColor(cat)}`}
                                style={{ width: `${percent}%` }}
                            ></div>
                        </div>
                        <div className="text-xs text-stone-400 mt-2 font-mono text-right">
                            {data.visited} / {data.total}
                        </div>
                    </div>
                  </div>
                );
            })}
        </div>

        {/* 3. Provinces List (Horizontal Grid) */}
        <div>
            <div className="flex items-center justify-between mb-4">
                 <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
                    <TrendingUp size={14} />
                    省份探索榜 Top 10
                 </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {stats.sortedProvinces.map(([province, data], index) => {
                     const pPercent = Math.round((data.visited / data.total) * 100);
                     return (
                         <div key={province} className="bg-stone-50 border border-stone-100 rounded-xl p-3 flex flex-col gap-2 relative overflow-hidden">
                             <div className="flex justify-between items-center z-10 relative">
                                 <span className="text-sm font-bold text-stone-700 flex items-center gap-1.5">
                                    <span className={`text-[10px] w-4 h-4 rounded-full flex items-center justify-center ${index < 3 ? 'bg-amber-100 text-amber-700' : 'bg-stone-200 text-stone-500'}`}>
                                        {index + 1}
                                    </span>
                                    {province}
                                 </span>
                                 <span className="text-xs font-mono text-stone-400">{data.visited}/{data.total}</span>
                             </div>
                             
                             {/* Mini Progress Bar */}
                             <div className="h-1 w-full bg-stone-200 rounded-full overflow-hidden z-10 relative">
                                 <div className="bg-stone-600 h-full rounded-full" style={{ width: `${pPercent}%` }}></div>
                             </div>
                         </div>
                     )
                })}
            </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsPanel;