import React from 'react';
import { useQueue } from '../../context/QueueContext';
import { CATEGORIES_CONFIG } from '../../data/mockBusinesses';
import { Search, SlidersHorizontal, X, ArrowUpDown, Sparkles } from 'lucide-react';

export const FilterBar: React.FC = () => {
  const { filters, setFilters, businesses } = useQueue();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, searchQuery: e.target.value }));
  };

  const handleCategorySelect = (categoryId: string) => {
    setFilters((prev) => ({ ...prev, category: categoryId }));
  };

  const handleStatusSelect = (statusId: string) => {
    setFilters((prev) => ({ ...prev, status: statusId }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      status: 'all',
      sortBy: 'wait',
      searchQuery: '',
    });
  };

  const isFiltered =
    filters.category !== 'all' ||
    filters.status !== 'all' ||
    filters.searchQuery !== '' ||
    filters.sortBy !== 'wait';

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 space-y-3.5">
      {/* Top Search & Sort Row */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={handleSearchChange}
            placeholder="Search cafe, clinic, barber, DMV, service..."
            className="w-full bg-slate-100 text-slate-900 placeholder-slate-400 pl-10 pr-10 py-2.5 sm:py-3 rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all border border-transparent focus:border-transparent"
          />
          {filters.searchQuery && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-2.5 rounded-xl border border-transparent text-sm">
            <ArrowUpDown className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
              Sort:
            </span>
            <select
              value={filters.sortBy}
              onChange={handleSortChange}
              className="bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer pr-1"
            >
              <option value="wait">Shortest Wait Time</option>
              <option value="distance">Nearest Distance</option>
              <option value="rating">Top Rated</option>
              <option value="queueLength">Smallest Queue</option>
            </select>
          </div>

          {isFiltered && (
            <button
              onClick={clearFilters}
              className="px-3 py-2.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1">
        {CATEGORIES_CONFIG.map((cat) => {
          const isSelected = filters.category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-heading font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Wait Time Quick Status Filters */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-500 font-semibold mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-blue-600" />
            Wait Speed:
          </span>

          <button
            onClick={() => handleStatusSelect('all')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
              filters.status === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All
          </button>

          <button
            onClick={() => handleStatusSelect('short')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              filters.status === 'short'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Fast (&lt;15m)
          </button>

          <button
            onClick={() => handleStatusSelect('moderate')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              filters.status === 'moderate'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Steady (15-30m)
          </button>

          <button
            onClick={() => handleStatusSelect('busy')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              filters.status === 'busy'
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Busy (30m+)
          </button>
        </div>

        <div className="text-slate-400 font-medium hidden sm:flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Real-time crowd radar</span>
        </div>
      </div>
    </div>
  );
};
