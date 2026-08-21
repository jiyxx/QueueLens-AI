import React from 'react';
import { useQueue } from '../../context/QueueContext';
import { Ticket, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export const MyQueuesPage: React.FC = () => {
  const { activeTokens, historyTokens, setPageView } = useQueue();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            <Ticket className="w-4 h-4" />
            <span>Digital Passes</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            My Queue Passes
          </h1>
        </div>

        <button
          onClick={() => setPageView('discover')}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white font-heading font-bold text-xs sm:text-sm hover:bg-blue-700 shadow-xs transition-all cursor-pointer"
        >
          Find New Queue +
        </button>
      </div>

      {/* Active Passes Section */}
      <div className="mb-10">
        <h2 className="font-heading font-bold text-base sm:text-lg text-slate-900 mb-4 flex items-center gap-2">
          <span>Active In-Line Tickets</span>
          <span className="w-5 h-5 rounded-md bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
            {activeTokens.length}
          </span>
        </h2>

        {activeTokens.length > 0 ? (
          <div className="space-y-3.5">
            {activeTokens.map((token) => (
              <div
                key={token.id}
                onClick={() => setPageView('live-queue')}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 hover:border-blue-600 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-heading font-extrabold text-lg shrink-0 group-hover:scale-105 transition-transform">
                    #{token.tokenNumber}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                      {token.businessName}
                    </h3>
                    <p className="text-xs text-slate-400">{token.businessBranch}</p>
                    <p className="text-xs text-slate-600 mt-1 font-medium">
                      Service: {token.serviceName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-400 block">Current Position</span>
                    <span className="font-heading font-extrabold text-lg text-blue-600">
                      #{token.currentPosition}
                    </span>
                    <span className="text-xs text-slate-500 block">
                      ~{token.estimatedWaitMins}m wait
                    </span>
                  </div>

                  <button className="py-2 px-3.5 rounded-xl bg-blue-600 text-white font-heading font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer">
                    <span>Track Live</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
            <p className="text-sm text-slate-500 mb-3">You have no active virtual queues right now.</p>
            <button
              onClick={() => setPageView('discover')}
              className="text-xs font-heading font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Browse Places & Join Queue →
            </button>
          </div>
        )}
      </div>

      {/* History Passes */}
      {historyTokens.length > 0 && (
        <div>
          <h2 className="font-heading font-bold text-base sm:text-lg text-slate-900 mb-4">
            Past Queue History
          </h2>
          <div className="space-y-2.5">
            {historyTokens.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center justify-between gap-4 text-xs text-slate-600"
              >
                <div className="flex items-center gap-3">
                  {item.status === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <div>
                    <span className="font-bold text-slate-900 text-sm block">
                      Token #{item.tokenNumber} • {item.businessName}
                    </span>
                    <span className="text-slate-400">
                      {item.serviceName} ({item.customerName})
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`font-bold capitalize px-2.5 py-1 rounded-md text-xs border ${
                      item.status === 'completed'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
