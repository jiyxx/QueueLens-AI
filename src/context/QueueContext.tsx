import React, { createContext, useContext, useState, useEffect } from 'react';
import { Business, QueueToken, FilterOptions, PageView, ServiceItem } from '../types';
import { MOCK_BUSINESSES } from '../data/mockBusinesses';
import confetti from 'canvas-confetti';

interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface QueueContextType {
  businesses: Business[];
  selectedBusiness: Business | null;
  setSelectedBusiness: (b: Business | null) => void;
  pageView: PageView;
  setPageView: (view: PageView) => void;
  activeTokens: QueueToken[];
  currentActiveToken: QueueToken | null;
  historyTokens: QueueToken[];
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  toasts: ToastMessage[];
  addToast: (title: string, description: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  joinQueue: (
    business: Business,
    service: ServiceItem,
    customer: { name: string; phone: string; partySize: number; notes?: string }
  ) => QueueToken;
  cancelQueue: (tokenId: string) => void;
  markArrived: (tokenId: string) => void;
  requestDelay: (tokenId: string, minutesToAdd: number) => void;
  advanceQueueSim: (tokenId: string) => void;
  toggleAutoSim: () => void;
  isAutoSimActive: boolean;
  prefillJoinBusiness: Business | null;
  setPrefillJoinBusiness: (b: Business | null) => void;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

// Initial sample active queue token (matching the City Walk Clinic in the stitch design hero)
const INITIAL_DEMO_TOKEN: QueueToken = {
  id: 'token-demo-citywalk',
  businessId: 'city-walk-clinic',
  businessName: 'City Walk Clinic',
  businessBranch: 'Medical Pavilion',
  businessImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
  tokenNumber: 'M-114',
  serviceId: 'srv-urgent-walkin',
  serviceName: 'Urgent Care Doctor Consultation',
  serviceDuration: 15,
  partySize: 1,
  customerName: 'Alex Morgan',
  customerPhone: '(555) 349-8821',
  specialNotes: 'Routine check & slight sprain',
  initialPosition: 12,
  currentPosition: 12,
  totalQueueWhenJoined: 14,
  initialWaitMins: 45,
  estimatedWaitMins: 45,
  joinedAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  status: 'waiting',
  hasArrived: false,
  notificationsEnabled: true,
  deskNumber: 'Desk 4B',
};

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businesses, setBusinesses] = useState<Business[]>(MOCK_BUSINESSES);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(MOCK_BUSINESSES[0]);
  const [prefillJoinBusiness, setPrefillJoinBusiness] = useState<Business | null>(null);
  const [pageView, setPageView] = useState<PageView>('landing');
  const [activeTokens, setActiveTokens] = useState<QueueToken[]>([INITIAL_DEMO_TOKEN]);
  const [historyTokens, setHistoryTokens] = useState<QueueToken[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isAutoSimActive, setIsAutoSimActive] = useState<boolean>(true);

  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    status: 'all',
    sortBy: 'wait',
    searchQuery: '',
  });

  const currentActiveToken = activeTokens.length > 0 ? activeTokens[0] : null;

  const addToast = (
    title: string,
    description: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'info'
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const joinQueue = (
    business: Business,
    service: ServiceItem,
    customer: { name: string; phone: string; partySize: number; notes?: string }
  ): QueueToken => {
    // Generate token prefix from category
    const prefixMap: Record<string, string> = {
      cafe: 'C',
      clinic: 'M',
      salon: 'B',
      banking: 'H',
      dmv: 'D',
      dining: 'T',
      retail: 'R',
    };
    const prefix = prefixMap[business.category] || 'Q';
    const randomNum = Math.floor(100 + Math.random() * 900);
    const tokenNumber = `${prefix}-${randomNum}`;

    const newPosition = business.peopleInQueue + 1;
    const estWait = Math.max(
      4,
      Math.round(newPosition * (business.averageWaitPerPersonMins || 4))
    );

    const newToken: QueueToken = {
      id: `token-${Date.now()}`,
      businessId: business.id,
      businessName: business.name,
      businessBranch: business.branch,
      businessImage: business.imageUrl,
      tokenNumber,
      serviceId: service.id,
      serviceName: service.name,
      serviceDuration: service.durationMinutes,
      partySize: customer.partySize,
      customerName: customer.name,
      customerPhone: customer.phone,
      specialNotes: customer.notes,
      initialPosition: newPosition,
      currentPosition: newPosition,
      totalQueueWhenJoined: newPosition,
      initialWaitMins: estWait,
      estimatedWaitMins: estWait,
      joinedAt: new Date().toISOString(),
      status: 'waiting',
      hasArrived: false,
      notificationsEnabled: true,
      deskNumber: `Counter ${Math.floor(1 + Math.random() * 6)}`,
    };

    setActiveTokens((prev) => [newToken, ...prev]);

    // Update business queue count
    setBusinesses((prev) =>
      prev.map((b) =>
        b.id === business.id
          ? {
              ...b,
              peopleInQueue: b.peopleInQueue + 1,
              estimatedWaitMins: estWait,
            }
          : b
      )
    );

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#2a14b4', '#4338ca', '#5148d7', '#4648d4'],
      });
    } catch {
      // safe fallback
    }

    addToast(
      `Queue Joined: ${tokenNumber}`,
      `You are #${newPosition} in line for ${business.name}. Estimated wait is ~${estWait} mins.`,
      'success'
    );

    return newToken;
  };

  const advanceQueueSim = (tokenId: string) => {
    setActiveTokens((prev) =>
      prev.map((t) => {
        if (t.id !== tokenId) return t;

        if (t.currentPosition <= 1) {
          if (t.status === 'almost_ready') {
            // Now serving!
            try {
              confetti({
                particleCount: 120,
                spread: 100,
                origin: { y: 0.5 },
                colors: ['#10b981', '#2a14b4', '#f59e0b'],
              });
            } catch {
              // ignore
            }
            addToast(
              `🔔 It's Your Turn! Token ${t.tokenNumber}`,
              `Please proceed immediately to ${t.deskNumber || 'Desk 1'} at ${t.businessName}!`,
              'success'
            );
            return {
              ...t,
              currentPosition: 0,
              estimatedWaitMins: 0,
              status: 'serving',
            };
          } else if (t.status === 'serving') {
            // Complete
            addToast(
              `Service Completed`,
              `Your appointment at ${t.businessName} has concluded. Thank you for using QueueLess!`,
              'info'
            );
            const completed = { ...t, status: 'completed' as const };
            setHistoryTokens((h) => [completed, ...h]);
            return completed;
          }
        }

        const nextPos = Math.max(1, t.currentPosition - 1);
        const nextMins = Math.max(2, Math.round(nextPos * 3.5));
        const nextStatus = nextPos <= 2 ? 'almost_ready' : 'waiting';

        if (nextStatus === 'almost_ready' && t.status === 'waiting') {
          addToast(
            `Almost Your Turn! (Position ${nextPos})`,
            `Please make your way towards ${t.businessName} (${t.businessBranch}). You are next soon!`,
            'warning'
          );
        } else {
          addToast(
            `Queue Progressed`,
            `Position moved from ${t.currentPosition} → ${nextPos} (${nextMins} mins est).`,
            'info'
          );
        }

        return {
          ...t,
          currentPosition: nextPos,
          estimatedWaitMins: nextMins,
          status: nextStatus,
        };
      }).filter((t) => t.status !== 'completed' && t.status !== 'cancelled')
    );
  };

  const cancelQueue = (tokenId: string) => {
    const target = activeTokens.find((t) => t.id === tokenId);
    if (!target) return;

    setActiveTokens((prev) => prev.filter((t) => t.id !== tokenId));
    setHistoryTokens((prev) => [{ ...target, status: 'cancelled' }, ...prev]);

    // decrement queue count on business
    setBusinesses((prev) =>
      prev.map((b) =>
        b.id === target.businessId
          ? {
              ...b,
              peopleInQueue: Math.max(0, b.peopleInQueue - 1),
            }
          : b
      )
    );

    addToast(
      'Queue Ticket Cancelled',
      `Your spot (#${target.tokenNumber}) for ${target.businessName} has been released.`,
      'info'
    );
  };

  const markArrived = (tokenId: string) => {
    setActiveTokens((prev) =>
      prev.map((t) => (t.id === tokenId ? { ...t, hasArrived: true } : t))
    );
    addToast(
      'Check-in Confirmed',
      'The reception desk has been notified that you have physically arrived.',
      'success'
    );
  };

  const requestDelay = (tokenId: string, minutesToAdd: number) => {
    setActiveTokens((prev) =>
      prev.map((t) =>
        t.id === tokenId
          ? {
              ...t,
              currentPosition: t.currentPosition + 1,
              estimatedWaitMins: t.estimatedWaitMins + minutesToAdd,
            }
          : t
      )
    );
    addToast(
      `Delayed by ${minutesToAdd} Minutes`,
      `We shifted your position back by 1 spot so you have extra buffer time.`,
      'info'
    );
  };

  const toggleAutoSim = () => {
    setIsAutoSimActive((prev) => !prev);
    addToast(
      isAutoSimActive ? 'Live Simulation Paused' : 'Live Simulation Resumed',
      isAutoSimActive
        ? 'Automatic queue progression is now paused.'
        : 'Queue simulation will automatically progress in the background.',
      'info'
    );
  };

  // Background timer to simulate active queue moving realistically
  useEffect(() => {
    if (!isAutoSimActive || activeTokens.length === 0) return;

    const interval = setInterval(() => {
      // Pick the first waiting token to occasionally advance
      setActiveTokens((current) => {
        const waitingIdx = current.findIndex(
          (t) => t.status === 'waiting' || t.status === 'almost_ready'
        );
        if (waitingIdx === -1) return current;

        const target = current[waitingIdx];
        if (target.currentPosition > 1) {
          const nextPos = target.currentPosition - 1;
          const nextWait = Math.max(1, target.estimatedWaitMins - 3);
          const nextStatus = nextPos <= 2 ? 'almost_ready' : 'waiting';

          if (nextStatus === 'almost_ready' && target.status === 'waiting') {
            addToast(
              `🔔 Almost Ready! (Position ${nextPos})`,
              `Head to ${target.businessName}. You're nearly at the front of the queue!`,
              'warning'
            );
          }

          return current.map((item, idx) =>
            idx === waitingIdx
              ? {
                  ...item,
                  currentPosition: nextPos,
                  estimatedWaitMins: nextWait,
                  status: nextStatus,
                }
              : item
          );
        }
        return current;
      });
    }, 28000); // Progresses every 28 seconds

    return () => clearInterval(interval);
  }, [isAutoSimActive, activeTokens.length]);

  return (
    <QueueContext.Provider
      value={{
        businesses,
        selectedBusiness,
        setSelectedBusiness,
        pageView,
        setPageView,
        activeTokens,
        currentActiveToken,
        historyTokens,
        filters,
        setFilters,
        toasts,
        addToast,
        removeToast,
        joinQueue,
        cancelQueue,
        markArrived,
        requestDelay,
        advanceQueueSim,
        toggleAutoSim,
        isAutoSimActive,
        prefillJoinBusiness,
        setPrefillJoinBusiness,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error('useQueue must be used within a QueueProvider');
  }
  return context;
};
