/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { QueueProvider, useQueue } from './context/QueueContext';
import { Navbar } from './components/common/Navbar';
import { ToastContainer } from './components/common/ToastContainer';
import { Footer } from './components/common/Footer';
import { LandingHero } from './components/landing/LandingHero';
import { DiscoverPage } from './components/discover/DiscoverPage';
import { ExploreMap } from './components/map/ExploreMap';
import { BusinessDetailPage } from './components/business/BusinessDetailPage';
import { JoinQueuePage } from './components/queue/JoinQueuePage';
import { LiveQueueTracking } from './components/queue/LiveQueueTracking';
import { MyQueuesPage } from './components/queue/MyQueuesPage';
import { HowItWorksPage } from './components/pages/HowItWorksPage';
import { ForBusinessesPage } from './components/pages/ForBusinessesPage';
import { AnimatePresence, motion } from 'motion/react';

const AppContent: React.FC = () => {
  const { pageView } = useQueue();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pageView]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-500/15 selection:text-blue-600">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Main View Transition Container */}
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={pageView}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            {pageView === 'landing' && <LandingHero />}
            {pageView === 'discover' && <DiscoverPage />}
            {pageView === 'map' && <ExploreMap />}
            {pageView === 'business-detail' && <BusinessDetailPage />}
            {pageView === 'join-queue' && <JoinQueuePage />}
            {pageView === 'live-queue' && <LiveQueueTracking />}
            {pageView === 'my-queues' && <MyQueuesPage />}
            {pageView === 'how-it-works' && <HowItWorksPage />}
            {pageView === 'for-businesses' && <ForBusinessesPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <QueueProvider>
      <AppContent />
    </QueueProvider>
  );
}
