import React from 'react';
import { useQueue } from '../../context/QueueContext';
import { Clock, ArrowRight } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { setPageView } = useQueue();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full mb-3">
          <Clock className="w-4 h-4 text-blue-600" />
          <span className="font-heading text-xs font-bold text-blue-600 uppercase tracking-wider">
            Intelligent Wait Engineering
          </span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
          How QueueLess Eliminates Waiting Lines
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-4 leading-relaxed">
          We turn rigid physical waiting lobbies into dynamic virtual queues. Spend your time sipping coffee, shopping, or working until your exact arrival window.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-heading font-extrabold text-lg mb-5">
            1
          </div>
          <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">
            Real-Time Crowd & Wait Telemetry
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Our predictive queue algorithm analyzes staff speed, service complexity, and active counter turnover to provide continuous 98%+ accurate wait estimates.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-heading font-extrabold text-lg mb-5">
            2
          </div>
          <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">
            Instant Remote Spot Reservation
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Pick your specific service and join with one click. No app install required—you receive a unique digital token instantly accessible from your web browser.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-heading font-extrabold text-lg mb-5">
            3
          </div>
          <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">
            Smart SMS & Buzzer Alerts
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            When you reach top 2 positions in line, we send automated gentle reminder alerts with enough buffer for you to walk over comfortably.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-heading font-extrabold text-lg mb-5">
            4
          </div>
          <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">
            Contactless Counter Check-In
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Upon walking in, tap &quot;I&apos;ve Arrived&quot; or scan your digital QR desk pass. The receptionist or attendant is instantly notified of your arrival.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-white rounded-2xl p-8 sm:p-10 text-center border border-slate-200 shadow-sm max-w-xl mx-auto">
        <h3 className="font-heading font-extrabold text-2xl text-slate-900 mb-2">
          Try It Out Now
        </h3>
        <p className="text-sm text-slate-500 mb-6">
          Explore our live directory of cafes, walk-in clinics, and barber salons.
        </p>
        <button
          onClick={() => setPageView('discover')}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-heading font-bold text-sm hover:bg-blue-700 transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Find a Queue Near Me</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
