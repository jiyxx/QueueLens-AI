import React from 'react';
import { QueueStatus } from '../../types';

interface StatusBadgeProps {
  status: QueueStatus;
  customText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  customText,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px] gap-1 rounded',
    md: 'px-2.5 py-1 text-xs gap-1.5 rounded-md',
    lg: 'px-3 py-1.5 text-sm gap-2 rounded-lg',
  };

  const dotSize = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2 h-2',
  };

  switch (status) {
    case 'short':
      return (
        <span
          className={`inline-flex items-center font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/80 ${sizeClasses[size]}`}
        >
          <span className={`${dotSize[size]} rounded-full bg-emerald-500`} />
          <span>{customText || 'Fast Wait'}</span>
        </span>
      );
    case 'moderate':
      return (
        <span
          className={`inline-flex items-center font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200/80 ${sizeClasses[size]}`}
        >
          <span className={`${dotSize[size]} rounded-full bg-amber-500`} />
          <span>{customText || 'Steady'}</span>
        </span>
      );
    case 'busy':
      return (
        <span
          className={`inline-flex items-center font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200/80 ${sizeClasses[size]}`}
        >
          <span className={`${dotSize[size]} rounded-full bg-rose-500`} />
          <span>{customText || 'Busy'}</span>
        </span>
      );
    case 'closed':
    default:
      return (
        <span
          className={`inline-flex items-center font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200 ${sizeClasses[size]}`}
        >
          <span className={`${dotSize[size]} rounded-full bg-slate-400`} />
          <span>{customText || 'Closed'}</span>
        </span>
      );
  }
};

