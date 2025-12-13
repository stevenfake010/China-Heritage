import React, { useEffect, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { GeoJSONData, HeritageSite } from '../types';
import { HERITAGE_SITES } from '../constants';
import { Loader2, RefreshCw, MapPin, AlertTriangle } from 'lucide-react';

interface ChinaMapProps {
  visitedSiteIds: Set<string>;
  onSiteClick: (siteId: string) => void;
}

// Priority list of GeoJSON sources
const MAP_DATA_URLS = [
  'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json', // Primary: Aliyun (Standard, detailed)
  'https://cdn.jsdelivr.net/gh/yezongyang/china-geojson@master/china.json', // Fallback 1: JSDelivr (High availability)
  'https://raw.githubusercontent.com/waylau/svg-china-map/master/china-map/china.json' // Fallback 2: GitHub Raw (Last resort)
];

const ChinaMap: React.FC<ChinaMapProps> = ({ visitedSiteIds, onSiteClick }) => {
  const [geoData, setGeoData] = useState<GeoJSONData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [hoveredSite, setHoveredSite] = useState<HeritageSite | null>(null);

  const fetchMapData = async () => {
    setLoading(true);
    setError(false);
    
    for (const url of MAP_DATA_URLS) {
      try {
        console.log(`Attempting to load map data from: ${url}`);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        
        // Basic validation to ensure it's GeoJSON
        if (!data.features || !Array.isArray(data.features)) {
          throw new Error("Invalid GeoJSON format");
        }

        setGeoData(data);
        setLoading(false);
        return; // Success, exit loop
      } catch (err) {
        console.warn(`Failed to load from ${url}:`, err);
        // Continue to next URL
      }
    }

    // If we get here, all URLs failed
    console.error("All map data sources failed.");
    setError(true);
    setLoading(false);
  };

  useEffect(() => {
    fetchMapData();
  }, []);

  const { pathGenerator, projection } = useMemo(() => {
    if (!geoData) return { pathGenerator: null, projection: null };

    const width = 800;
    const height = 600;
    
    // Manual projection configuration for China.
    const projection = d3.geoMercator()
      .center([104.5, 36.5]) 
      .scale(750) 
      .translate([width / 2, height / 2]);

    const pathGenerator = d3.geoPath().projection(projection);

    return { pathGenerator, projection };
  }, [geoData]);

  if (loading) {
    return (
      <div className="w-full h-[600px] flex flex-col items-center justify-center bg-stone-200 rounded-xl gap-3">
        <Loader2 className="animate-spin text-stone-500 w-10 h-10" />
        <p className="text-stone-500 text-sm font-medium">正在加载地图数据...</p>
      </div>
    );
  }

  if (error || !geoData || !pathGenerator || !projection) {
    return (
      <div className="w-full h-[600px] flex flex-col items-center justify-center bg-stone-200 rounded-xl text-stone-500 gap-4 p-8 text-center">
        <div className="bg-white p-4 rounded-full shadow-sm">
            <AlertTriangle size={32} className="text-amber-500" />
        </div>
        <div>
            <h3 className="font-bold text-stone-700 mb-1">地图加载失败</h3>
            <p className="text-sm max-w-md mx-auto">
                无法从数据源加载地图数据，请检查网络连接。
            </p>
        </div>
        <button 
          onClick={fetchMapData}
          className="flex items-center gap-2 px-5 py-2.5 bg-stone-800 text-white rounded-lg shadow-sm text-sm font-medium hover:bg-stone-900 transition-colors mt-2"
        >
          <RefreshCw size={16} /> 重试
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200 rounded-2xl shadow-inner border border-stone-200">
      <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur px-4 py-2 rounded-lg shadow-sm pointer-events-none">
        <h3 className="text-sm font-semibold text-stone-800">中国遗产地图</h3>
        <p className="text-xs text-stone-600">探索省份，点击旗帜打卡</p>
      </div>

      <svg viewBox="0 0 800 600" className="w-full h-full select-none">
        <g>
          {geoData.features && geoData.features.map((feature, i) => {
            const provinceName = feature.properties.name; 
            const isHovered = hoveredProvince === provinceName;
            
            return (
              <path
                key={`province-${i}`}
                d={pathGenerator(feature) || ''}
                fill={isHovered ? '#d6d3d1' : '#e5e7eb'} // stone-300 : gray-200
                stroke="white"
                strokeWidth={1}
                className="transition-colors duration-200 ease-in-out cursor-pointer outline-none"
                onMouseEnter={() => setHoveredProvince(provinceName)}
                onMouseLeave={() => setHoveredProvince(null)}
              />
            );
          })}
        </g>

        {/* Render Sites */}
        <g>
          {HERITAGE_SITES.map((site) => {
            const projected = projection(site.coordinates);
            if (!projected) return null;
            const [x, y] = projected;
            
            const isVisited = visitedSiteIds.has(site.id);
            const isHovered = hoveredSite?.id === site.id;

            return (
              <g
                key={site.id}
                transform={`translate(${x}, ${y})`}
                className="cursor-pointer group"
                onClick={() => onSiteClick(site.id)}
                onMouseEnter={() => setHoveredSite(site)}
                onMouseLeave={() => setHoveredSite(null)}
              >
                {/* Ping animation for unvisited sites to draw attention */}
                {!isVisited && (
                  <circle
                    r={8}
                    fill="#ca8a04" // yellow-600
                    className="animate-ping opacity-40"
                  />
                )}
                
                {/* The Flag Stick */}
                {isVisited && (
                   <line x1={0} y1={0} x2={0} y2={-14} stroke="#44403c" strokeWidth={1.5} />
                )}

                {/* The Marker/Flag */}
                {isVisited ? (
                    // Flag for visited
                    <g transform="translate(0, -14)"> 
                         <path d="M0,0 L12,6 L0,12 Z" fill="#dc2626" /> {/* Red Flag */}
                    </g>
                ) : (
                    // Dot for unvisited
                    <circle r={4} fill="#ca8a04" stroke="white" strokeWidth={1.5} />
                )}

                {/* Tooltip on Hover */}
                {isHovered && (
                  <g transform="translate(14, -20)" className="pointer-events-none z-50">
                     <rect
                      x={-4}
                      y={-18}
                      width={Math.min(200, Math.max(120, site.name.length * 14))} // Adjusted width for Chinese chars
                      height={26}
                      rx={4}
                      fill="rgba(28, 25, 23, 0.95)" 
                    />
                    <text
                      fill="white"
                      fontSize={12}
                      fontWeight="bold"
                      dy={-1}
                      fontFamily="'Noto Serif SC', serif"
                    >
                      {site.name.length > 15 ? site.name.substring(0, 14) + '...' : site.name}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </g>
      </svg>
      
      {/* Bottom overlay for province name */}
      {hoveredProvince && (
        <div className="absolute bottom-4 right-4 pointer-events-none text-right">
          <span className="text-4xl font-black text-stone-300 uppercase tracking-widest opacity-60 font-serif block drop-shadow-sm">
            {hoveredProvince}
          </span>
        </div>
      )}
    </div>
  );
};

export default ChinaMap;