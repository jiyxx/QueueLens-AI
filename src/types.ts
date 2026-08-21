export type BusinessCategory =
  | 'all'
  | 'cafe'
  | 'clinic'
  | 'salon'
  | 'banking'
  | 'dmv'
  | 'dining'
  | 'retail';

export type QueueStatus = 'short' | 'moderate' | 'busy' | 'closed';

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price?: number;
  categoryTag?: string;
}

export interface Business {
  id: string;
  name: string;
  branch: string;
  category: BusinessCategory;
  categoryLabel: string;
  rating: number;
  reviewCount: number;
  distanceKm: number;
  address: string;
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
    xPercent: number; // For custom interactive svg/canvas map
    yPercent: number;
  };
  imageUrl: string;
  bannerUrl: string;
  description: string;
  hours: string;
  status: QueueStatus;
  estimatedWaitMins: number;
  peopleInQueue: number;
  currentServingToken: string;
  averageWaitPerPersonMins: number;
  services: ServiceItem[];
  features: string[];
  isOpen: boolean;
}

export interface QueueToken {
  id: string;
  businessId: string;
  businessName: string;
  businessBranch: string;
  businessImage: string;
  tokenNumber: string;
  serviceId: string;
  serviceName: string;
  serviceDuration: number;
  partySize: number;
  customerName: string;
  customerPhone: string;
  specialNotes?: string;
  initialPosition: number;
  currentPosition: number;
  totalQueueWhenJoined: number;
  initialWaitMins: number;
  estimatedWaitMins: number;
  joinedAt: string; // ISO string
  status: 'waiting' | 'almost_ready' | 'serving' | 'completed' | 'cancelled';
  hasArrived: boolean;
  notificationsEnabled: boolean;
  deskNumber?: string;
}

export interface FilterOptions {
  category: string;
  status: string;
  sortBy: 'wait' | 'distance' | 'rating' | 'queueLength';
  searchQuery: string;
  maxWaitMins?: number;
}

export type PageView =
  | 'landing'
  | 'discover'
  | 'map'
  | 'business-detail'
  | 'join-queue'
  | 'live-queue'
  | 'my-queues'
  | 'how-it-works'
  | 'for-businesses';
