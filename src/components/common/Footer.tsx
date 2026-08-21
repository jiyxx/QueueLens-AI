import React from 'react';
import { useQueue } from '../../context/QueueContext';
import { Layers } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setPageView } = useQueue();

  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
                <Layers className="w-4 h-4" />
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900">
                Queue<span className="text-blue-600">Less</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              The intelligent wait management platform. See real-time queues, join virtually, and arrive exactly when it&apos;s your turn.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational • Live Radar Active</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-heading font-bold text-xs text-slate-900 uppercase tracking-wider mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <button
                  onClick={() => {
                    setPageView('discover');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Discover Live Places
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setPageView('map');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Explore Interactive Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setPageView('live-queue');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Live Queue Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setPageView('my-queues');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  My Digital Tickets
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Business */}
          <div>
            <h4 className="font-heading font-bold text-xs text-slate-900 uppercase tracking-wider mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <button
                  onClick={() => {
                    setPageView('how-it-works');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setPageView('for-businesses');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  For Businesses
                </button>
              </li>
              <li>
                <span className="text-slate-400">Wait Algorithm v2.4</span>
              </li>
              <li>
                <span className="text-slate-400">Privacy & Terms</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} QueueLess Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Stop Waiting. Start Planning.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
