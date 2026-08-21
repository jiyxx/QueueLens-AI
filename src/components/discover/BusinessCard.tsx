import React from 'react';
import { Business } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { useQueue } from '../../context/QueueContext';
import { Users, MapPin, Star, ArrowRight, Clock, CheckCircle } from 'lucide-react';

interface BusinessCardProps {
  business: Business;
  onJoinClick?: (business: Business) => void;
  onDetailsClick?: (business: Business) => void;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  onJoinClick,
  onDetailsClick,
}) => {
  const { setSelectedBusiness, setPageView, activeTokens, setPrefillJoinBusiness } = useQueue();

  const userActiveToken = activeTokens.find((t) => t.businessId === business.id && (t.status === 'waiting' || t.status === 'almost_ready' || t.status === 'serving'));

  const handleCardClick = () => {
    setSelectedBusiness(business);
    if (onDetailsClick) {
      onDetailsClick(business);
    } else {
      setPageView('business-detail');
    }
  };

  const handleJoin = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedBusiness(business);
    setPrefillJoinBusiness(business);
    if (onJoinClick) {
      onJoinClick(business);
    } else {
      setPageView('join-queue');
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-200 border border-slate-200 flex flex-col justify-between cursor-pointer relative overflow-hidden"
    >
      {/* Top Banner / Image preview */}
      <div className="flex items-start gap-3.5 mb-3.5">
        <div className="w-13 h-13 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
          <img
            src={business.imageUrl}
            alt={business.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 truncate group-hover:text-blue-600 transition-colors">
            {business.name}
          </h3>
          <p className="text-xs text-slate-500 truncate mt-0.5">
            {business.branch} • {business.categoryLabel}
          </p>
        </div>
        <div className="shrink-0">
          <StatusBadge status={business.status} size="sm" />
        </div>
      </div>

      {/* Main Metric Display */}
      <div className="my-2.5 py-3 px-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Estimated Wait
          </span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span
              className={`font-heading font-extrabold text-2xl sm:text-3xl tracking-tight ${
                business.status === 'short'
                  ? 'text-blue-600'
                  : business.status === 'busy'
                  ? 'text-rose-600'
                  : 'text-amber-700'
              }`}
            >
              {business.estimatedWaitMins}
            </span>
            <span className="text-xs font-semibold text-slate-500">mins est.</span>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center justify-end gap-1 text-xs text-slate-600">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-bold text-slate-900">{business.peopleInQueue}</span> in queue
          </div>
          <div className="flex items-center justify-end gap-1 text-[11px] text-slate-400 mt-1">
            <Clock className="w-3 h-3" />
            <span>Serving #{business.currentServingToken}</span>
          </div>
        </div>
      </div>

      {/* Meta tags (Distance, Rating) */}
      <div className="flex items-center justify-between text-xs text-slate-500 my-2 pt-1 border-t border-slate-100">
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="font-bold text-slate-800">{business.rating}</span>
          <span className="text-slate-400">({business.reviewCount})</span>
        </div>
        <div className="flex items-center gap-1 text-slate-500">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span>{business.distanceKm} km away</span>
        </div>
      </div>

      {/* Active User Badge if already in this queue */}
      {userActiveToken ? (
        <div className="mt-3 py-2 px-3 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-between text-xs font-semibold text-blue-700">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            <span>In queue (Pos. {userActiveToken.currentPosition})</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setPageView('live-queue');
            }}
            className="hover:underline flex items-center gap-1 text-blue-600 font-bold"
          >
            Track <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      ) : (
        /* Action Button */
        <div className="mt-3 pt-1 flex items-center gap-2">
          <button
            onClick={handleJoin}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white hover:bg-blue-600 font-heading font-bold text-xs sm:text-sm transition-all duration-150 shadow-sm text-center flex items-center justify-center gap-1.5 group/btn cursor-pointer"
          >
            <span>Join Queue</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};
