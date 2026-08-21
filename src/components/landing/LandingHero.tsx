import React from 'react';
import { useQueue } from '../../context/QueueContext';
import { ArrowRight, CheckCircle, MapPin, Sparkles, Clock, ShieldCheck, Zap, Smartphone, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export const LandingHero: React.FC = () => {
  const { setPageView, setSelectedBusiness, businesses, setPrefillJoinBusiness } = useQueue();

  const artisanCoffee = businesses.find((b) => b.id === 'artisan-coffee') || businesses[0];
  const cityWalkClinic = businesses.find((b) => b.id === 'city-walk-clinic') || businesses[1];

  const handleJoinArtisan = () => {
    setSelectedBusiness(artisanCoffee);
    setPrefillJoinBusiness(artisanCoffee);
    setPageView('join-queue');
  };

  const handleViewCityWalk = () => {
    setSelectedBusiness(cityWalkClinic);
    setPageView('live-queue');
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-hidden">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-6 z-10"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-lg w-fit">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="font-heading text-xs sm:text-sm font-bold text-blue-700 tracking-wide uppercase">
              Intelligent Wait Management
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-[54px] lg:leading-[60px] text-slate-900 tracking-tight">
            Stop Waiting.<br />
            Start <span className="text-blue-600">Planning.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-lg leading-relaxed font-normal">
            Transform how you experience physical locations. See real-time queues, join virtually, and arrive exactly when it&apos;s your turn.
          </p>

          {/* Primary Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              onClick={() => setPageView('discover')}
              className="bg-blue-600 text-white px-7 py-3.5 rounded-xl font-heading font-bold text-sm sm:text-base hover:bg-blue-700 transition-all shadow-sm flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.99]"
            >
              <span>Find a Queue Near Me</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setPageView('map')}
              className="bg-white text-slate-900 border border-slate-200 px-6 py-3.5 rounded-xl font-heading font-bold text-sm sm:text-base hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Explore Live Map</span>
            </button>
          </div>

          {/* Live Mini Trust Stats */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-left">
            <div>
              <span className="font-heading font-extrabold text-2xl text-slate-900">3.2M+</span>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Hours Saved</p>
            </div>
            <div>
              <span className="font-heading font-extrabold text-2xl text-blue-600">98.4%</span>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Accuracy Rate</p>
            </div>
            <div>
              <span className="font-heading font-extrabold text-2xl text-slate-900">0 min</span>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Physical Waiting</p>
            </div>
          </div>
        </motion.div>

        {/* Right Visual - Floating Geometric Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative h-[440px] sm:h-[480px] lg:h-[520px] w-full flex items-center justify-center"
        >
          {/* Decorative Background Panel */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 via-blue-50/50 to-white rounded-3xl -z-10 border border-slate-200/80 shadow-xs" />

          {/* Floating Card 1 - Artisan Coffee */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-6 sm:top-8 right-2 sm:right-6 lg:right-6 bg-white rounded-2xl p-5 w-[260px] sm:w-[290px] shadow-md border border-slate-200 z-20"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900">
                  Artisan Coffee
                </h3>
                <p className="text-xs text-slate-500">Downtown Branch</p>
              </div>
              <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold uppercase text-[10px] flex items-center gap-1 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Fast Wait</span>
              </div>
            </div>

            <div className="flex items-baseline gap-1.5 mb-4">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-blue-600">
                5
              </span>
              <span className="text-xs font-semibold text-slate-500">mins est.</span>
            </div>

            <button
              onClick={handleJoinArtisan}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-heading font-bold text-xs sm:text-sm transition-all text-center flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>Join Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          {/* Floating Card 2 - City Walk Clinic (With Live Status) */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-10 sm:bottom-12 left-2 sm:left-6 lg:left-4 bg-white rounded-2xl p-5 w-[260px] sm:w-[290px] shadow-md border border-slate-200 z-20"
          >
            <div className="flex justify-between items-start mb-2.5">
              <div>
                <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                  City Walk Clinic
                </h3>
                <p className="text-xs text-slate-400">Medical Pavilion</p>
              </div>
              <div className="bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded font-bold uppercase text-[10px] flex items-center gap-1 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span>Busy</span>
              </div>
            </div>

            <div className="flex items-baseline gap-1.5 mb-3">
              <span className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
                45
              </span>
              <span className="text-xs font-semibold text-slate-500">mins est.</span>
            </div>

            <button
              onClick={handleViewCityWalk}
              className="w-full py-2 px-3 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-between text-xs font-bold text-blue-700 hover:bg-blue-100 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>You are in queue (Pos. 12)</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </motion.div>

          {/* Map Pin Decoration */}
          <div
            onClick={() => setPageView('map')}
            className="absolute bottom-4 sm:bottom-6 right-6 sm:right-12 bg-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-md animate-bounce cursor-pointer hover:bg-blue-700 transition-colors z-30"
            style={{ animationDuration: '2.8s' }}
            title="Explore Interactive Map"
          >
            <MapPin className="w-6 h-6" />
          </div>
        </motion.div>
      </section>

      {/* Interactive Live Ticker Bar */}
      <section className="w-full bg-white border-y border-slate-200 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 shrink-0">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-heading font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">
                Live Crowd Telemetry:
              </span>
            </div>

            <div className="flex items-center gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 text-xs">
              {businesses.slice(0, 4).map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setSelectedBusiness(b);
                    setPageView('business-detail');
                  }}
                  className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-600 whitespace-nowrap transition-colors text-left cursor-pointer"
                >
                  <span className="font-bold text-slate-900">{b.name}</span>
                  <span className="text-slate-300">•</span>
                  <span
                    className={`font-extrabold ${
                      b.status === 'short'
                        ? 'text-emerald-700'
                        : b.status === 'busy'
                        ? 'text-rose-600'
                        : 'text-amber-700'
                    }`}
                  >
                    {b.estimatedWaitMins}m wait
                  </span>
                  <span className="text-slate-500">({b.peopleInQueue} in line)</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-md mb-2.5 border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-blue-700">
              Zero Friction Process
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
            How QueueLess Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Say goodbye to standing in crowded lobbies. Join in seconds and arrive just in time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200 relative flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-heading font-extrabold text-lg mb-5 border border-blue-200">
                01
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
                Discover Nearby Places
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Explore local coffee shops, walk-in clinics, barber salons, DMV hubs, and banks with real-time wait times on live interactive radar.
              </p>
            </div>
            <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-blue-600">
              <Clock className="w-4 h-4" />
              <span>Instant wait estimations</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200 relative flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-heading font-extrabold text-lg mb-5 shadow-sm">
                02
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
                Join with One Tap
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pick your desired service and receive an instant digital token. You are secured in line without stepping foot through the door.
              </p>
            </div>
            <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-blue-600">
              <Zap className="w-4 h-4" />
              <span>No app download or account required</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200 relative flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-heading font-extrabold text-lg mb-5 border border-blue-200">
                03
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
                Arrive Exactly On Time
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Follow your live ticket countdown. We notify you when you are next so you walk right up to the service counter without delay.
              </p>
            </div>
            <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-blue-600">
              <Smartphone className="w-4 h-4" />
              <span>Smart SMS & buzzer alerts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Live Queues Grid Preview */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Trending In Your Area
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1">
              Popular Live Virtual Queues
            </h2>
          </div>
          <button
            onClick={() => setPageView('discover')}
            className="text-xs sm:text-sm font-heading font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All ({businesses.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {businesses.slice(0, 3).map((b) => (
            <div
              key={b.id}
              onClick={() => {
                setSelectedBusiness(b);
                setPageView('business-detail');
              }}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md border border-slate-200 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                    {b.name}
                  </h3>
                  <p className="text-xs text-slate-500">{b.branch}</p>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    b.status === 'short'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : b.status === 'busy'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}
                >
                  {b.status === 'short'
                    ? 'Fast Wait'
                    : b.status === 'busy'
                    ? 'Busy'
                    : 'Steady'}
                </span>
              </div>

              <div className="flex items-baseline gap-1.5 mb-4">
                <span className="font-heading font-extrabold text-3xl text-blue-600">
                  {b.estimatedWaitMins}
                </span>
                <span className="text-xs font-semibold text-slate-500">mins est.</span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedBusiness(b);
                  setPrefillJoinBusiness(b);
                  setPageView('join-queue');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-heading font-bold text-xs sm:text-sm transition-all cursor-pointer"
              >
                Join Queue
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-md border border-slate-800">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight">
              Ready to eliminate waiting rooms forever?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 mb-6">
              Join thousands of people saving valuable time every day. Browse local queues or add your business to QueueLess today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => setPageView('discover')}
                className="bg-blue-600 text-white px-7 py-3 rounded-xl font-heading font-bold text-sm sm:text-base hover:bg-blue-700 shadow-sm transition-transform active:scale-95 cursor-pointer"
              >
                Discover Live Queues
              </button>
              <button
                onClick={() => setPageView('for-businesses')}
                className="bg-slate-800 text-slate-200 border border-slate-700 px-7 py-3 rounded-xl font-heading font-bold text-sm sm:text-base hover:bg-slate-700 transition-colors cursor-pointer"
              >
                QueueLess for Businesses
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
