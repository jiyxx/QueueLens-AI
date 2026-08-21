import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { ServiceItem } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { ArrowLeft, MapPin, Clock, Phone, Star, Users, Sparkles, ArrowRight, CheckCircle2, Share2, Heart } from 'lucide-react';

export const BusinessDetailPage: React.FC = () => {
  const { selectedBusiness, setPageView, setPrefillJoinBusiness, addToast, activeTokens } = useQueue();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    selectedBusiness?.services[0] || null
  );
  const [isSaved, setIsSaved] = useState(false);

  if (!selectedBusiness) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-slate-900">No business selected</h2>
        <button
          onClick={() => setPageView('discover')}
          className="mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-heading font-bold text-sm cursor-pointer"
        >
          Return to Discover
        </button>
      </div>
    );
  }

  const business = selectedBusiness;
  const userTokenForThisBusiness = activeTokens.find(
    (t) => t.businessId === business.id && (t.status === 'waiting' || t.status === 'almost_ready' || t.status === 'serving')
  );

  const handleJoinForService = (service: ServiceItem) => {
    setSelectedService(service);
    setPrefillJoinBusiness(business);
    setPageView('join-queue');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    addToast('Link Copied', `Queue link for ${business.name} copied to clipboard!`, 'success');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Top Breadcrumb / Back Navigation */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={() => setPageView('discover')}
          className="inline-flex items-center gap-2 text-sm font-heading font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Discover</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsSaved(!isSaved);
              addToast(
                isSaved ? 'Removed from favorites' : 'Saved to favorites',
                `${business.name} updated in your bookmarks`,
                'info'
              );
            }}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              isSaved
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900'
            }`}
            title="Save business"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
          </button>

          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Banner with Venue Imagery */}
      <div className="relative rounded-2xl overflow-hidden h-[240px] sm:h-[300px] md:h-[360px] border border-slate-200 shadow-sm mb-8">
        <img
          src={business.bannerUrl}
          alt={business.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
              {business.categoryLabel}
            </span>
            <StatusBadge status={business.status} />
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            {business.name}
          </h1>
          <p className="text-sm text-slate-200 mt-1 max-w-2xl">
            {business.branch} • {business.address}
          </p>
        </div>
      </div>

      {/* Grid: Left column (Services & Details) / Right column (Live Queue Radar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* About Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200">
            <h2 className="font-heading font-bold text-lg text-slate-900 mb-3">
              About this location
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {business.description}
            </p>

            {/* Key info badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6 pt-5 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{business.hours}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{business.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{business.distanceKm} km away</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                <span className="font-bold text-slate-900">{business.rating} / 5.0</span>
                <span className="text-slate-400">({business.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Features checklist */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Venue Amenities & Queue Features
              </h4>
              <div className="flex flex-wrap gap-2">
                {business.features.map((feat, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>{feat}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Available Services Menu */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-heading font-bold text-lg text-slate-900">
                  Available Services
                </h2>
                <p className="text-xs text-slate-500">
                  Select a service to save your spot in line
                </p>
              </div>
              <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md border border-blue-200">
                {business.services.length} Options
              </span>
            </div>

            <div className="space-y-3">
              {business.services.map((service) => (
                <div
                  key={service.id}
                  className="p-4 sm:p-5 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-slate-50/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                        {service.name}
                      </h3>
                      {service.categoryTag && (
                        <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {service.categoryTag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        ~{service.durationMinutes} min turnaround
                      </span>
                      {service.price !== undefined && (
                        <span className="font-bold text-slate-900">
                          {service.price === 0 ? 'Free / Included' : `$${service.price.toFixed(2)}`}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleJoinForService(service)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 font-heading font-bold text-xs sm:text-sm text-slate-800 transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
                  >
                    <span>Join for This</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Live Queue Telemetry Box (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Telemetry Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Live Queue Radar
              </span>
              <StatusBadge status={business.status} />
            </div>

            {/* Estimated Wait Big Metric */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-center my-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Current Estimated Wait
              </span>
              <div className="flex items-baseline justify-center gap-2 mt-1">
                <span className="font-heading font-extrabold text-5xl sm:text-6xl text-blue-600 tracking-tight">
                  {business.estimatedWaitMins}
                </span>
                <span className="text-sm font-semibold text-slate-600">minutes</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Based on live serving speeds and desk capacity
              </p>
            </div>

            {/* Live Queue Statistics */}
            <div className="grid grid-cols-2 gap-3 mb-6 text-center">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block">People Ahead</span>
                <span className="font-heading font-bold text-lg text-slate-900">
                  {business.peopleInQueue} in line
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block">Now Serving</span>
                <span className="font-heading font-bold text-lg text-blue-600">
                  #{business.currentServingToken}
                </span>
              </div>
            </div>

            {/* Active Token status check or CTA Button */}
            {userTokenForThisBusiness ? (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-blue-700">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>You hold token #{userTokenForThisBusiness.tokenNumber}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Your position: #{userTokenForThisBusiness.currentPosition} (approx {userTokenForThisBusiness.estimatedWaitMins}m wait)
                  </p>
                </div>

                <button
                  onClick={() => setPageView('live-queue')}
                  className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-heading font-bold text-sm hover:bg-blue-700 transition-all shadow-sm text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Track Live Queue Progress</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setPrefillJoinBusiness(business);
                  setPageView('join-queue');
                }}
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 text-white font-heading font-bold text-sm sm:text-base hover:bg-blue-700 transition-all shadow-sm text-center flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
              >
                <span>Join Virtual Queue Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <p className="text-center text-[11px] text-slate-400 mt-4">
              Free to join • Instant live tracking • No app download needed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
