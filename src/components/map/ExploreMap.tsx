import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { Business } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { MapPin, Navigation, Compass, Layers, ZoomIn, ZoomOut, Search, Star, Clock, Users, ArrowRight, X } from 'lucide-react';
import { CATEGORIES_CONFIG } from '../../data/mockBusinesses';

export const ExploreMap: React.FC = () => {
  const { businesses, selectedBusiness, setSelectedBusiness, setPageView, setPrefillJoinBusiness } = useQueue();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [mapZoom, setMapZoom] = useState<number>(1);
  const [mapCenter, setMapCenter] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredBusiness, setHoveredBusiness] = useState<Business | null>(null);

  const filteredBusinesses = businesses.filter((b) =>
    activeCategory === 'all' ? true : b.category === activeCategory
  );

  const handlePinClick = (business: Business) => {
    setSelectedBusiness(business);
  };

  const handleJoinClick = (business: Business) => {
    setSelectedBusiness(business);
    setPrefillJoinBusiness(business);
    setPageView('join-queue');
  };

  const handleDetailsClick = (business: Business) => {
    setSelectedBusiness(business);
    setPageView('business-detail');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            <Compass className="w-4 h-4" />
            <span>Interactive Live Radar</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Explore Queues Near You
          </h1>
        </div>

        {/* Category switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES_CONFIG.slice(0, 5).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map + Sidebar Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[660px]">
        {/* Interactive Map Visual Area (7 cols on desktop) */}
        <div className="lg:col-span-7 xl:col-span-8 bg-slate-100 rounded-2xl relative overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between select-none">
          {/* Stylized Vector Map Surface */}
          <div
            className="absolute inset-0 bg-slate-100 transition-transform duration-300 origin-center"
            style={{
              transform: `scale(${mapZoom}) translate(${mapCenter.x}px, ${mapCenter.y}px)`,
            }}
          >
            {/* SVG Roads, Waterways, City Blocks */}
            <svg className="w-full h-full opacity-80" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice">
              {/* Land background */}
              <rect width="1000" height="700" fill="#f1f5f9" />

              {/* Waterway / Bay curve */}
              <path
                d="M-50,0 Q200,300 0,700 L-100,700 L-100,0 Z"
                fill="#e2e8f0"
              />
              <path
                d="M900,0 Q750,250 1050,700 L1100,700 L1100,0 Z"
                fill="#e2e8f0"
              />

              {/* Park greens */}
              <rect x="350" y="100" width="160" height="110" rx="16" fill="#dcfce7" opacity="0.8" />
              <rect x="680" y="380" width="140" height="150" rx="16" fill="#dcfce7" opacity="0.7" />
              <rect x="150" y="440" width="130" height="130" rx="16" fill="#dcfce7" opacity="0.6" />

              {/* City Grid - Primary Arterial Avenues */}
              <line x1="0" y1="220" x2="1000" y2="220" stroke="#ffffff" strokeWidth="18" />
              <line x1="0" y1="420" x2="1000" y2="420" stroke="#ffffff" strokeWidth="22" />
              <line x1="0" y1="580" x2="1000" y2="580" stroke="#ffffff" strokeWidth="14" />

              <line x1="280" y1="0" x2="280" y2="700" stroke="#ffffff" strokeWidth="20" />
              <line x1="520" y1="0" x2="520" y2="700" stroke="#ffffff" strokeWidth="26" />
              <line x1="760" y1="0" x2="760" y2="700" stroke="#ffffff" strokeWidth="18" />

              {/* Secondary Cross Streets */}
              <line x1="0" y1="120" x2="1000" y2="120" stroke="#f8fafc" strokeWidth="8" />
              <line x1="0" y1="320" x2="1000" y2="320" stroke="#f8fafc" strokeWidth="10" />
              <line x1="0" y1="500" x2="1000" y2="500" stroke="#f8fafc" strokeWidth="8" />
              <line x1="160" y1="0" x2="160" y2="700" stroke="#f8fafc" strokeWidth="8" />
              <line x1="400" y1="0" x2="400" y2="700" stroke="#f8fafc" strokeWidth="10" />
              <line x1="640" y1="0" x2="640" y2="700" stroke="#f8fafc" strokeWidth="8" />
              <line x1="880" y1="0" x2="880" y2="700" stroke="#f8fafc" strokeWidth="8" />

              {/* Highway / Expressway */}
              <path
                d="M 50,700 C 250,550 450,400 950,150"
                fill="none"
                stroke="#fed7aa"
                strokeWidth="12"
              />

              {/* District Street Names */}
              <text x="360" y="90" fill="#94a3b8" fontSize="13" fontFamily="Inter" fontWeight="700">
                FINANCIAL DISTRICT
              </text>
              <text x="540" y="300" fill="#94a3b8" fontSize="13" fontFamily="Inter" fontWeight="700">
                MARKET SQUARE
              </text>
              <text x="180" y="420" fill="#94a3b8" fontSize="13" fontFamily="Inter" fontWeight="700">
                HEALTHCARE CORRIDOR
              </text>
            </svg>

            {/* User Current Location Indicator (Radar Pulse) */}
            <div className="absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-14 w-14 rounded-full bg-blue-500 opacity-25" />
                <span className="relative inline-flex rounded-full h-5 w-5 bg-blue-600 border-2 border-white shadow-md items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </span>
                <span className="absolute top-6 bg-white px-2 py-0.5 rounded-md text-[10px] font-bold text-blue-700 shadow-sm whitespace-nowrap border border-slate-200">
                  You (Downtown)
                </span>
              </div>
            </div>

            {/* Interactive Business Map Pins */}
            {filteredBusinesses.map((b) => {
              const isSelected = selectedBusiness?.id === b.id;
              const isHovered = hoveredBusiness?.id === b.id;

              return (
                <div
                  key={b.id}
                  onClick={() => handlePinClick(b)}
                  onMouseEnter={() => setHoveredBusiness(b)}
                  onMouseLeave={() => setHoveredBusiness(null)}
                  className="absolute cursor-pointer transition-all duration-150 z-20 group"
                  style={{
                    left: `${b.coordinates.xPercent}%`,
                    top: `${b.coordinates.yPercent}%`,
                    transform: 'translate(-50%, -100%)',
                  }}
                >
                  {/* Pin Badge */}
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg shadow-sm transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white scale-105 ring-4 ring-blue-500/20 z-30'
                        : isHovered
                        ? 'bg-slate-900 text-white scale-105'
                        : 'bg-white text-slate-900 hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        b.status === 'short'
                          ? 'bg-emerald-500'
                          : b.status === 'busy'
                          ? 'bg-rose-500'
                          : 'bg-amber-500'
                      }`}
                    />
                    <span className="font-heading font-extrabold text-xs">
                      {b.estimatedWaitMins}m
                    </span>
                    <span className="text-[11px] font-medium max-w-[80px] truncate hidden sm:inline">
                      {b.name}
                    </span>
                  </div>

                  {/* Pin Point Arrow */}
                  <div
                    className={`w-2 h-2 mx-auto -mt-1 transform rotate-45 ${
                      isSelected
                        ? 'bg-blue-600'
                        : isHovered
                        ? 'bg-slate-900'
                        : 'bg-white border-r border-b border-slate-200'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Floating Map Controls & Overlays */}
          <div className="absolute top-4 left-4 z-30 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-2 text-xs font-bold text-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{filteredBusinesses.length} Live Queues Active</span>
          </div>

          {/* Zoom and Navigation Controls */}
          <div className="absolute top-4 right-4 z-30 flex flex-col gap-1.5">
            <button
              onClick={() => setMapZoom((z) => Math.min(1.8, z + 0.2))}
              className="w-9 h-9 rounded-xl bg-white shadow-sm border border-slate-200 text-slate-800 hover:bg-slate-50 flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMapZoom((z) => Math.max(0.8, z - 0.2))}
              className="w-9 h-9 rounded-xl bg-white shadow-sm border border-slate-200 text-slate-800 hover:bg-slate-50 flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setMapZoom(1);
                setMapCenter({ x: 0, y: 0 });
              }}
              className="w-9 h-9 rounded-xl bg-white shadow-sm border border-slate-200 text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
              title="Recenter"
            >
              <Navigation className="w-4 h-4" />
            </button>
          </div>

          {/* Floating Selected Business Card */}
          {selectedBusiness && (
            <div className="absolute bottom-4 left-4 right-4 sm:left-4 sm:right-auto sm:w-[340px] z-30 bg-white rounded-2xl p-4 shadow-lg border border-slate-200 animate-in fade-in slide-in-from-bottom-2 duration-150">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-heading font-bold text-base text-slate-900">
                    {selectedBusiness.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedBusiness.branch} • {selectedBusiness.distanceKm} km away
                  </p>
                </div>
                <StatusBadge status={selectedBusiness.status} size="sm" />
              </div>

              <div className="flex items-baseline gap-2 my-2 py-2 px-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-heading font-extrabold text-xl text-blue-600">
                  {selectedBusiness.estimatedWaitMins}
                </span>
                <span className="text-xs font-semibold text-slate-500">mins wait</span>
                <span className="text-xs text-slate-400 ml-auto font-medium">
                  {selectedBusiness.peopleInQueue} in line
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2.5">
                <button
                  onClick={() => handleDetailsClick(selectedBusiness)}
                  className="py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-heading font-bold text-slate-700 text-center cursor-pointer"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleJoinClick(selectedBusiness)}
                  className="py-2 px-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-heading font-bold text-center shadow-sm cursor-pointer"
                >
                  Join Queue
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar List of Locations (5 cols on desktop) */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col h-full bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div>
              <h2 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                Locations In Range
              </h2>
              <p className="text-xs text-slate-400">Click to highlight on map</p>
            </div>
            <button
              onClick={() => setPageView('discover')}
              className="text-xs font-heading font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Card View →
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 space-y-2.5">
            {filteredBusinesses.map((b) => {
              const isSelected = selectedBusiness?.id === b.id;
              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBusiness(b)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-300 shadow-xs'
                      : 'bg-slate-50 border-slate-100 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-heading font-bold text-sm text-slate-900">
                        {b.name}
                      </h4>
                      <p className="text-xs text-slate-500">{b.branch}</p>
                    </div>
                    <span
                      className={`text-xs font-bold ${
                        b.status === 'short'
                          ? 'text-emerald-700'
                          : b.status === 'busy'
                          ? 'text-rose-600'
                          : 'text-amber-700'
                      }`}
                    >
                      {b.estimatedWaitMins}m
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 mt-2 pt-2 border-t border-slate-200/60">
                    <span className="flex items-center gap-1 text-slate-500">
                      <Users className="w-3 h-3 text-blue-600" />
                      {b.peopleInQueue} in line
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {b.distanceKm} km
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
