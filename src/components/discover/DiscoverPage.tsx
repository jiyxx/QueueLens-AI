import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { FilterBar } from './FilterBar';
import { BusinessCard } from './BusinessCard';
import { Business } from '../../types';
import { Compass, MapPin, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export const DiscoverPage: React.FC = () => {
  const { businesses, filters, setFilters, setPageView, currentActiveToken } = useQueue();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter businesses based on search and filters
  const filteredBusinesses = businesses.filter((b) => {
    // Category filter
    if (filters.category !== 'all' && b.category !== filters.category) {
      return false;
    }

    // Status filter
    if (filters.status !== 'all' && b.status !== filters.status) {
      return false;
    }

    // Search query filter
    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      const matchName = b.name.toLowerCase().includes(q);
      const matchBranch = b.branch.toLowerCase().includes(q);
      const matchCategory = b.categoryLabel.toLowerCase().includes(q);
      const matchAddress = b.address.toLowerCase().includes(q);
      const matchServices = b.services.some(
        (s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      );
      if (!matchName && !matchBranch && !matchCategory && !matchAddress && !matchServices) {
        return false;
      }
    }

    return true;
  });

  // Sorting
  const sortedBusinesses = [...filteredBusinesses].sort((a, b) => {
    switch (filters.sortBy) {
      case 'wait':
        return a.estimatedWaitMins - b.estimatedWaitMins;
      case 'distance':
        return a.distanceKm - b.distanceKm;
      case 'rating':
        return b.rating - a.rating;
      case 'queueLength':
        return a.peopleInQueue - b.peopleInQueue;
      default:
        return 0;
    }
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 400);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            <Compass className="w-4 h-4" />
            <span>Real-Time Virtual Queues</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Discover Live Places
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            Check current wait times and save your place in line before stepping out.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-600 text-slate-600 hover:text-blue-600 shadow-sm transition-all cursor-pointer"
            title="Refresh Live Wait Times"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
          </button>

          <button
            onClick={() => setPageView('map')}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-600 text-xs sm:text-sm font-heading font-bold text-slate-800 hover:text-blue-600 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>Map View</span>
          </button>
        </div>
      </div>

      {/* Active Queue Banner if user has an ongoing ticket */}
      {currentActiveToken && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 sm:p-5 rounded-2xl bg-slate-900 text-white shadow-sm border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center font-heading font-extrabold text-lg text-white shrink-0 shadow-sm">
              #{currentActiveToken.tokenNumber}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
                  Your Active Ticket
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                {currentActiveToken.businessName} ({currentActiveToken.businessBranch})
              </h3>
              <p className="text-xs text-slate-300">
                Position #{currentActiveToken.currentPosition} • ~{currentActiveToken.estimatedWaitMins} mins estimated wait
              </p>
            </div>
          </div>

          <button
            onClick={() => setPageView('live-queue')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-heading font-bold text-xs sm:text-sm hover:bg-blue-700 shadow-sm transition-transform active:scale-95 shrink-0 self-stretch sm:self-auto text-center cursor-pointer"
          >
            Track Live Status →
          </button>
        </motion.div>
      )}

      {/* Filters Bar */}
      <div className="mb-8">
        <FilterBar />
      </div>

      {/* Result Count and Grid */}
      <div className="mb-4 flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-900">{sortedBusinesses.length}</strong> live locations
        </span>
        {filters.category !== 'all' && (
          <span className="bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-md">
            Filtered by Category
          </span>
        )}
      </div>

      {sortedBusinesses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {sortedBusinesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-sm max-w-lg mx-auto my-12">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7 text-slate-400" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900 mb-1.5">
            No locations found
          </h3>
          <p className="text-sm text-slate-500 mb-6">
            We couldn&apos;t find any businesses matching &ldquo;{filters.searchQuery}&rdquo; with your active filter criteria.
          </p>
          <button
            onClick={() =>
              setFilters({
                category: 'all',
                status: 'all',
                sortBy: 'wait',
                searchQuery: '',
              })
            }
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-heading font-bold text-sm hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
