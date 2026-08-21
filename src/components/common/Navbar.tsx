import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { Layers, MapPin, Compass, Ticket, HelpCircle, Building2, Menu, X, Clock, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenMyQueues?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMyQueues }) => {
  const { pageView, setPageView, currentActiveToken, activeTokens } = useQueue();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'map', label: 'Explore Map', icon: MapPin },
    { id: 'how-it-works', label: 'How It Works', icon: HelpCircle },
    { id: 'for-businesses', label: 'For Businesses', icon: Building2 },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md w-full border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex justify-between items-center">
        {/* Brand Logo */}
        <button
          onClick={() => {
            setPageView('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group text-left focus:outline-none cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-heading font-extrabold text-lg shadow-sm group-hover:bg-blue-700 transition-colors">
            Q
          </div>
          <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900">
            Queue<span className="text-blue-600">Less</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = pageView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPageView(item.id as any)}
                className={`font-heading text-sm font-semibold transition-colors cursor-pointer py-1 relative ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right CTA / Queue Tracker Widget */}
        <div className="flex items-center gap-3">
          {/* Live Queue Active Chip */}
          {currentActiveToken && (
            <button
              onClick={() => setPageView('live-queue')}
              className="relative hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-all text-xs font-semibold text-blue-700"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="font-heading">
                Live: #{currentActiveToken.tokenNumber} ({currentActiveToken.estimatedWaitMins}m)
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
            </button>
          )}

          {/* My Queues Badge */}
          <button
            onClick={() => {
              if (activeTokens.length > 0) {
                setPageView('live-queue');
              } else {
                setPageView('my-queues');
              }
              if (onOpenMyQueues) onOpenMyQueues();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg font-heading text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors relative cursor-pointer"
            title="My Tickets"
          >
            <Ticket className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">My Tickets</span>
            {activeTokens.length > 0 && (
              <span className="w-5 h-5 rounded-md bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center ml-0.5">
                {activeTokens.length}
              </span>
            )}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => setPageView('discover')}
            className="bg-blue-600 text-white px-5 sm:px-6 py-2.5 rounded-xl font-heading text-xs sm:text-sm font-bold hover:bg-blue-700 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
          >
            Find a Queue
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-5 flex flex-col gap-3 animate-in slide-in-from-top duration-200">
          {currentActiveToken && (
            <button
              onClick={() => {
                setPageView('live-queue');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-medium text-sm"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  Active: #{currentActiveToken.tokenNumber} ({currentActiveToken.businessName})
                </span>
              </div>
              <span className="font-bold text-xs bg-blue-600 text-white px-2.5 py-1 rounded-md">
                Track
              </span>
            </button>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pageView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setPageView(item.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left font-heading text-sm font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">QueueLess Wait Management</span>
            <button
              onClick={() => {
                setPageView('discover');
                setMobileMenuOpen(false);
              }}
              className="text-xs text-blue-600 font-bold hover:underline"
            >
              Browse All Places →
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
