import React, { useMemo } from 'react';
import { Category } from '../types';
import { HERITAGE_SITES } from '../constants';
import { X, Palmtree, Scroll, Mountain, Map, Trophy, BarChart3, TrendingUp } from 'lucide-react';

interface StatisticsModalProps {
  visited: Set<string>;
  onClose: () => void;
}

const StatisticsModal: React.FC<StatisticsModalProps> = ({ visited, onClose }) => {
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

    // Sort provinces by TOTAL quantity (desc), then by visited (desc)
    const sortedProvinces = Object.entries(provinceMap)
      .sort(([, a], [, b]) => {
        if (b.total !== a.total) return b.total - a.total; // Sort by Quantity
        return b.visited - a.visited;
      });
      // No slice() - showing ALL provinces

    return { categories, sortedProvinces };
  }, [visited]);

  const getCategoryIcon = (cat: Category) => {
    switch (cat) {
      case '文化遗产': return <Scroll size={16} className="text-amber-600" />;
      case '自然遗产': return <Palmtree size={16} className="text-emerald-600" />;
      case '混合遗产': return <Mountain size={16} className="text-indigo-600" />;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col relative overflow-hidden border border-white/50">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-white/95 backdrop-blur z-20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-stone-100 rounded-lg text-stone-700">
              <BarChart3 size={20} />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-stone-800">探索数据统计</h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-stone-100 rounded-full text-stone-400 hover:text-stone-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 bg-stone-50/30">
          
          {/* Top Section: Compact 4 Panels Layout */}
          <section className="space-y-3">
             {/* 1. Global Progress Card (Full Width) */}
            <div className="bg-stone-900 rounded-2xl p-5 text-white relative overflow-hidden shadow-sm group min-h-[110px] flex flex-col justify-center">
                <Map className="absolute -bottom-8 -right-4 text-white opacity-5 w-32 h-32 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-5 rounded-full blur-2xl -mr-6 -mt-6"></div>
                
                <div className="relative z-10 flex items-end justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-stone-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                            <Trophy size={12} /> 总体进度
                        </div>
                        <div className="flex items-baseline gap-3">
                            <div className="text-4xl font-serif font-bold text-white">
                                {totalPercentage}%
                            </div>
                            <div className="text-stone-400 text-xs pb-1">
                                已探索 <span className="text-white font-bold">{visited.size}</span> / {HERITAGE_SITES.length} 处遗产
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative z-10 w-full bg-white/10 h-1.5 rounded-full mt-4 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${totalPercentage}%` }}></div>
                </div>
            </div>

            {/* 2. Category Cards (Grid of 3) */}
            <div className="grid grid-cols-3 gap-3">
                {(Object.keys(stats.categories) as Category[]).map((cat) => {
                    const data = stats.categories[cat];
                    const percent = data.total > 0 ? Math.round((data.visited / data.total) * 100) : 0;
                    
                    return (
                    <div key={cat} className="bg-white hover:bg-stone-50 transition-colors rounded-xl p-3 border border-stone-200/60 shadow-sm flex flex-col justify-between group">
                        <div className="flex justify-between items-start mb-2">
                            <div className="p-1.5 bg-stone-50 rounded-md">
                                {getCategoryIcon(cat)}
                            </div>
                            <span className="text-lg font-bold text-stone-800">{percent}<span className="text-[10px] text-stone-400 font-medium ml-0.5">%</span></span>
                        </div>
                        
                        <div>
                            <div className="text-xs font-bold text-stone-700 mb-1.5">{cat}</div>
                            <div className="h-1 w-full bg-stone-100 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full transition-all duration-1000 ${getCategoryColor(cat)}`}
                                    style={{ width: `${percent}%` }}
                                ></div>
                            </div>
                            <div className="text-[10px] text-stone-400 mt-1.5 font-mono text-right">
                                {data.visited}/{data.total}
                            </div>
                        </div>
                    </div>
                    );
                })}
            </div>
          </section>

          {/* Provinces Section */}
          <section>
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2 mb-3">
              <TrendingUp size={14} /> 全省份概览 ({stats.sortedProvinces.length}) • 按数量排序
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
              {stats.sortedProvinces.map(([province, data], index) => {
                 const percent = Math.round((data.visited / data.total) * 100);
                 const isCompleted = data.visited === data.total;
                 
                 return (
                   <div key={province} className={`rounded-lg p-2.5 border transition-all relative overflow-hidden group
                        ${isCompleted ? 'bg-emerald-50/50 border-emerald-100' : 'bg-white border-stone-100'}`}>
                      <div className="flex justify-between items-center z-10 relative mb-2">
                         <span className="text-sm font-bold text-stone-700 flex items-center gap-1.5">
                            <span className={`text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono
                                ${index < 3 ? 'bg-amber-100 text-amber-700' : 'bg-stone-100 text-stone-400'}`}>
                                {index + 1}
                            </span>
                            {province}
                         </span>
                         <span className={`text-xs font-mono font-bold ${isCompleted ? 'text-emerald-600' : 'text-stone-400'}`}>
                            {data.visited}/{data.total}
                         </span>
                      </div>
                      <div className="h-1 w-full bg-stone-100 rounded-full overflow-hidden">
                            <div 
                              className={`${isCompleted ? 'bg-emerald-500' : 'bg-stone-600'} h-full rounded-full`} 
                              style={{ width: `${percent}%` }}
                            ></div>
                      </div>
                   </div>
                 );
              })}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default StatisticsModal;