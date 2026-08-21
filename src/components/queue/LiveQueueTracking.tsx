import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  MapPin,
  Sparkles,
  X,
  FastForward,
  Play,
  Pause,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const LiveQueueTracking: React.FC = () => {
  const {
    currentActiveToken,
    setPageView,
    cancelQueue,
    markArrived,
    requestDelay,
    advanceQueueSim,
    toggleAutoSim,
    isAutoSimActive,
  } = useQueue();

  const [showQrModal, setShowQrModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  if (!currentActiveToken) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-5 border border-blue-200">
          <Clock className="w-8 h-8" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-slate-900 mb-2">
          No Active Queue Tickets
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
          You are not currently waiting in any virtual line. Explore nearby places and join a queue with a single tap.
        </p>
        <button
          onClick={() => setPageView('discover')}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-heading font-bold text-sm hover:bg-blue-700 transition-all shadow-sm cursor-pointer"
        >
          Discover Live Places →
        </button>
      </div>
    );
  }

  const token = currentActiveToken;
  const progressPercent = Math.min(
    100,
    Math.max(
      10,
      Math.round(
        ((token.totalQueueWhenJoined - token.currentPosition + 1) /
          Math.max(1, token.totalQueueWhenJoined)) *
          100
      )
    )
  );

  const isServing = token.status === 'serving';
  const isAlmostReady = token.status === 'almost_ready';

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Top Banner simulation toolbar for interactive testing */}
      <div className="mb-6 bg-slate-900 text-white rounded-xl p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs border border-slate-800">
        <div className="flex items-center gap-2 text-xs">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="font-heading font-bold">Live Queue Simulator:</span>
          <span className="text-slate-400">
            {isAutoSimActive ? 'Auto-ticking every ~28s' : 'Simulation paused'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => advanceQueueSim(token.id)}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Step next person in queue"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Advance Queue (+1 Step)</span>
          </button>

          <button
            onClick={toggleAutoSim}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer border border-slate-700"
          >
            {isAutoSimActive ? (
              <>
                <Pause className="w-3 h-3" />
                <span>Pause Sim</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                <span>Resume Sim</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Live Ticket Hero Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Ticket Header Bar */}
        <div
          className={`p-6 sm:p-7 text-white transition-colors duration-500 ${
            isServing
              ? 'bg-emerald-600'
              : isAlmostReady
              ? 'bg-amber-600'
              : 'bg-blue-600'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-white/80 block">
                Digital Queue Token
              </span>
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-0.5">
                {token.tokenNumber}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowQrModal(true)}
                className="bg-white/15 hover:bg-white/25 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 transition-all border border-white/20 cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Desk Pass QR</span>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-white/20 flex flex-wrap items-center justify-between gap-2 text-xs text-white/90">
            <span className="font-medium">
              {token.businessName} • {token.businessBranch}
            </span>
            <span>Service: {token.serviceName}</span>
          </div>
        </div>

        {/* Live Status Radar Box */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Real-time Status Callout */}
          <div
            className={`p-4 sm:p-5 rounded-xl border flex items-start gap-4 ${
              isServing
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : isAlmostReady
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
          >
            <div className="mt-0.5">
              {isServing ? (
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              ) : isAlmostReady ? (
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center animate-pulse">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-heading font-bold text-base">
                {isServing
                  ? `NOW SERVING: Proceed to ${token.deskNumber || 'Front Desk'}!`
                  : isAlmostReady
                  ? `Almost your turn! (Position #${token.currentPosition})`
                  : `You are in line (Position #${token.currentPosition})`}
              </h3>
              <p className="text-xs sm:text-sm mt-0.5 opacity-90 leading-relaxed">
                {isServing
                  ? 'Your ticket is currently active. Please show your token or scan the QR pass at the counter.'
                  : isAlmostReady
                  ? `Please walk to ${token.businessName}. You will be called up in ~${token.estimatedWaitMins} minutes.`
                  : `Relax and plan your schedule. We will alert you with live buzzer notifications when you're next.`}
              </p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Position Metric */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Current Position
              </span>
              <div className="font-heading font-extrabold text-3xl text-slate-900 mt-1">
                #{token.currentPosition}
              </div>
              <span className="text-xs text-slate-400 mt-0.5 block">
                out of {token.totalQueueWhenJoined} originally
              </span>
            </div>

            {/* Estimated Wait Metric */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Estimated Wait
              </span>
              <div className="font-heading font-extrabold text-3xl text-blue-600 mt-1">
                ~{token.estimatedWaitMins}
                <span className="text-sm font-medium ml-1">mins</span>
              </div>
              <span className="text-xs text-slate-400 mt-0.5 block">
                Live calculated pace
              </span>
            </div>

            {/* Check-in State */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col justify-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Arrival Check-in
              </span>
              <div className="mt-1">
                {token.hasArrived ? (
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" />
                    Arrived at Venue
                  </span>
                ) : (
                  <span className="text-xs text-slate-500 font-medium">Not yet on-site</span>
                )}
              </div>
            </div>
          </div>

          {/* Animated Queue Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-800">
              <span>Queue Progression</span>
              <span>{progressPercent}% Complete</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`h-full rounded-full ${
                  isServing
                    ? 'bg-emerald-500'
                    : isAlmostReady
                    ? 'bg-amber-500'
                    : 'bg-blue-600'
                }`}
              />
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-4 border-t border-slate-100">
            {!token.hasArrived ? (
              <button
                onClick={() => markArrived(token.id)}
                className="py-3 px-4 rounded-xl bg-blue-600 text-white font-heading font-bold text-xs sm:text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                <span>I&apos;ve Arrived at Venue</span>
              </button>
            ) : (
              <div className="py-3 px-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-heading font-bold text-xs text-center flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Check-in Logged</span>
              </div>
            )}

            <button
              onClick={() => requestDelay(token.id, 5)}
              className="py-3 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 font-heading font-bold text-xs sm:text-sm text-slate-800 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              title="Push your spot back by 1 position"
            >
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Delay (+5 Mins)</span>
            </button>

            <button
              onClick={() => setShowCancelModal(true)}
              className="py-3 px-4 rounded-xl bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-heading font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Cancel Ticket</span>
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Pass Modal */}
      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-xl border border-slate-200 text-center relative"
            >
              <button
                onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Counter Scanner Pass
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-blue-600 mt-1">
                Token #{token.tokenNumber}
              </h3>
              <p className="text-xs text-slate-500 mt-1 mb-5">{token.businessName}</p>

              {/* Styled QR Code Box */}
              <div className="p-5 rounded-2xl bg-slate-50 border-2 border-dashed border-blue-200 inline-block mb-5">
                <div className="w-40 h-40 bg-slate-900 p-2 rounded-xl flex items-center justify-center relative">
                  <div className="grid grid-cols-6 gap-1 w-full h-full p-2 bg-white rounded-lg">
                    {Array.from({ length: 36 }).map((_, idx) => (
                      <div
                        key={idx}
                        className={`rounded-xs ${
                          (idx * 7 + 3) % 2 === 0 || idx % 5 === 0 || idx < 7
                            ? 'bg-slate-900'
                            : 'bg-white'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-extrabold border-2 border-white shadow-sm">
                      QL
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Scan this code at the reception kiosk or show it to the attendant at {token.businessName}.
              </p>

              <button
                onClick={() => setShowQrModal(false)}
                className="mt-5 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors cursor-pointer"
              >
                Close Pass
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 sm:p-7 max-w-md w-full shadow-xl border border-slate-200 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-200">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-slate-900">
                Release Your Spot?
              </h3>
              <p className="text-sm text-slate-500 mt-2 mb-6">
                Are you sure you want to cancel token #{token.tokenNumber} for {token.businessName}? You will lose your position (#{token.currentPosition}) in line.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 text-xs sm:text-sm font-heading font-bold text-slate-800 hover:bg-slate-200 cursor-pointer"
                >
                  Keep Spot
                </button>
                <button
                  onClick={() => {
                    cancelQueue(token.id);
                    setShowCancelModal(false);
                  }}
                  className="py-2.5 px-4 rounded-xl bg-rose-600 text-white text-xs sm:text-sm font-heading font-bold hover:bg-rose-700 shadow-xs cursor-pointer"
                >
                  Yes, Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
